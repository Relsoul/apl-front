import axios from 'axios';
const request = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://itunes.apple.com/hk' : '/api',
});

export function getTopList(limit = 10) {
  return request.get(`/rss/topgrossingapplications/limit=${limit}/json`);
}

export function getContentList(limit = 10) {
  return request.get(`/rss/topfreeapplications/limit=${limit}/json`);
}

export function getLookUpByIds(ids: string[]) {
  return request.get(`/lookup`, {
    params: {
      id: ids.join(','),
    },
  });
}
