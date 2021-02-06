const axios = require("axios");

const Hero = async (req, res) => {
  try {
    const heroName = req.query.name;

    const fetchingHero = await axios.get(
      "https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json"
    );
    const listHero = await fetchingHero.data.data;

    for (let i in listHero) {
        const match = i.toLowerCase().match(heroName.toLowerCase());
        if (match !== null) {
            return res.json(listHero[i])
        }

    }
    res.json('No match')
  } catch (error) {
    res.sendStatus(500)
  }
};

module.exports = Hero;
