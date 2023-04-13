import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const keyword = String(req.headers.keyword);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${encodeURIComponent(
    process.env.TMDB_API || ""
  )}&language=en-US&query=${encodeURIComponent(
    keyword
  )}&page=1&include_adult=false`;

  return new Promise<void>((resolve, reject) => {
    fetch(url)
      .then(async (response) => {
        const _response = await response.json();
        res.status(200).json({ data: _response });
        resolve();
      })
      .catch((err) => {
        res.status(400).json({ err });
        reject();
      });
  });
}

export default handler;
