import relativeTime from 'date-fns/distance_in_words_to_now';

export const getRelDate = time => relativeTime(new Date(time), {addSuffix: true}).replace('about ', '');
