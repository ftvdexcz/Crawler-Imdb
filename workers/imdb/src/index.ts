import request from 'request-promise';
import * as cheerio from 'cheerio';
import Movie from './common/movie';
import fse from 'fs-extra';
import { Consumer } from './common/infra/rabbitConsumer';
import {
  EXCHANGE,
  NOTIFICATION_SERVICE,
  QUEUE,
  ROUTING_KEY,
} from './config/config';
import MovieFilter from './common/movieFilter';
import axios from 'axios';

const consumer = new Consumer();

const send_notification = async (
  message: string,
  data: {
    [x: string]: string;
  }
) => {
  const r = await axios.post(
    NOTIFICATION_SERVICE.URL,
    {
      message,
      data,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (r.status !== 200) throw new Error('Gửi thông báo thất bại');
};

const get_index_page = async (url: string) => {
  /* get all url in page */
  const html = await request.get(url);

  const $ = cheerio.load(html);

  const movies = $('.lister-item')
    .map((idx, ele) => {
      const url = `${$(ele).find('.lister-item-header > a').attr('href')}`;

      const num_votes = $(ele).find("p.sort-num_votes-visible span[name='nv']");
      const votes = +$(num_votes[0]).attr('data-value')!;

      const gross = $(num_votes[1]).text();

      return { url, votes, gross };
    })
    .get();

  return movies;
};

const extract_movie_url = async (movie_input: {
  url: string;
  votes: number;
  gross: string;
}): Promise<Movie> => {
  const movie: Movie = {
    ...movie_input,
    title: '',
    ratings: 0,
    durations: '',
    release_date: '',
    countries: [],
    genres: [],
    directors: [],
    description: '',
  };

  try {
    if (movie.url) {
      movie.url = 'https://www.imdb.com' + movie.url;
      const html = await request.get(movie.url);

      const $ = cheerio.load(html);

      movie.title = $('span.sc-afe43def-1').text();
      movie.ratings = +$($('span.sc-bde20123-1')[0]).text();
      movie.durations = $('ul.sc-afe43def-4 li').last().text();
      movie.release_date = $(
        "[data-testid='title-details-releasedate'] ul a"
      ).text();
      movie.countries = $("[data-testid='title-details-origin'] ul a")
        .map((idx, ele) => $(ele).text())
        .get();

      movie.genres = $("[data-testid='genres'] .ipc-chip-list__scroller a")
        .map((idx, ele) => $(ele).text())
        .get();

      movie.directors = $('.sc-bfec09a1-8 > li:nth-child(1) a')
        .map((idx, ele) => $(ele).text())
        .get();

      movie.description = $('p.sc-5f699a2-3 span').first().text();
    }
  } catch (err) {
    console.error(err);
  }
  return movie;
};

const get_movies_info = async (
  movies: { url: string; votes: number; gross: string }[]
): Promise<Movie[]> => {
  const extracted_movies = await Promise.all(movies.map(extract_movie_url));

  return extracted_movies;
};

const crawl_callback = async (message: MovieFilter) => {
  console.log(message);

  try {
    // send notification: "crawling..."
    await send_notification('đang crawl...', {
      crawl_id: message.crawl_id,
    });

    let url = `https://www.imdb.com/search/title/?sort=${message.sort}&count=${message.count}`;

    if (message.title) {
      url += `&title=${message.title}`;
    }

    if (message.title_type) {
      url += `&title_type=${message.title_type.join(',')}`;
    }

    if (message.genres) {
      url += `&genres=${message.genres.join(',')}`;
    }

    if (message.groups) {
      url += `&groups=${message.groups.join(',')}`;
    }

    if (message.max_rating || message.min_rating) {
      url += `&user_rating=${message.min_rating},${message.max_rating}`;
    }

    if (message.release_date_from || message.release_date_until) {
      url += `&release_date=${message.release_date_from},${message.release_date_until}`;
    }

    console.log(url);

    const movies = await get_index_page(url);
    // console.log(movies);

    const extracted_movies = await get_movies_info(movies);

    // console.log(extracted_movies);

    // create folder if not exist
    const dataObj = { crawl_id: message.crawl_id, extracted_movies };

    await send_notification('đang lưu vào csdl', {
      crawl_id: message.crawl_id,
    });

    // demo latency when save to database 1,5s :)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    fse.outputFileSync(
      `${__dirname}/../test_output/${message.crawl_id}.json`,
      JSON.stringify(dataObj)
    );

    await send_notification('hoàn thành', {
      crawl_id: message.crawl_id,
    });

    console.log('done');
  } catch (err) {
    console.log(err);
  }
};

const main = async () => {
  const channel = await consumer.createChannel();

  consumer.consumeMessage(
    channel,
    QUEUE.CRAWLER,
    EXCHANGE.DIRECT_EXCHANGE,
    ROUTING_KEY.CRAWLER,
    crawl_callback
  );
};

main();
