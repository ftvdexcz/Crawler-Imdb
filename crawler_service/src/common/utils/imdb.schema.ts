import Joi from 'joi';

const title_types = [
  'feature',
  'tv_movie',
  'tv_series',
  'tv_episode',
  'tv_special',
  'tv_miniseries',
  'documentary',
  'video_game',
  'short',
  'video',
  'tv_short',
  'podcast_series',
  'podcast_episode',
  'music_video',
];

const genres = [
  'action',
  'adventure',
  'animation',
  'biography',
  'comedy',
  'crime',
  'documentary',
  'drama',
  'family',
  'fantasy',
  'film-noir',
  'game-show',
  'history',
  'horror',
  'music',
  'musical',
  'mystery',
  'news',
  'reality-tv',
  'romance',
  'sci-fi',
  'sport',
  'talk-show',
  'thriller',
  'war',
  'western',
];

const groups = ['top_100', 'top_250', 'bottom_100', 'bottom_250'];

const sort = [
  'alpha,asc',
  'alpha,desc',
  'user_rating,asc',
  'user_rating,desc',
  'year,asc',
  'year,desc',
  'moviemeter,asc', // độ phổ biến tăng dần (lớn nhất -> bé nhất)
  'moviemeter,desc', // độ phổ biến giảm dần
  'num_votes,asc', // số vote tăng dần
  'num_votes,desc',
];

const imdb_schema = Joi.object({
  title: Joi.string().optional(),
  title_type: Joi.array().items(
    Joi.string()
      .valid(...title_types)
      .optional()
  ),
  release_date_from: Joi.string()
    .pattern(/^(\d{4})(-(\d{2})(-(\d{2}))?)?$/)
    .optional(),

  release_date_until: Joi.string()
    .pattern(/^(\d{4})(-(\d{2})(-(\d{2}))?)?$/)
    .optional(),

  min_rating: Joi.number().min(1.0).max(10).optional(),
  max_rating: Joi.number().min(1.0).max(10).optional(),
  genres: Joi.array().items(
    Joi.string()
      .valid(...genres)
      .optional()
  ),
  groups: Joi.array().items(
    Joi.string()
      .valid(...groups)
      .optional()
  ),
  count: Joi.number().valid(100, 50, 250).optional().default(50),
  sort: Joi.string()
    .valid(...sort)
    .optional()
    .default('moviemeter,asc'),
});

export default imdb_schema;
