const express = require("express");

const app = express();

app.use(express.json());

const port = 3001;

const bichos = [
    {
        id: 1,
        dezenas: [1, 2, 3, 4],
        bicho: "Avestruz",
        imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Jaguar_%28Panthera_onca_palustris%29_female_Piquiri_River_2.JPG/280px-Jaguar_%28Panthera_onca_palustris%29_female_Piquiri_River_2.JPG",
    },
];

const sortNums = (n) => {
    const nums = [];
    for (let i = 0; i < n; i++) {
        const sorted = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
        nums.push(sorted);
    }

    return nums;
};

app.get("/bichos", (req, res) => res.json(bichos));

app.post("/jogar", (req, res) => {
    const meusBichos = req.body.bichos;
    if (!Array.isArray(meusBichos)) {
        return res.status(400).json({ error: "Informe os identificadores dos bichos!" });
    }

    dezenas = sortNums(meusBichos.length * 4);

    const bichosFiltrados = bichos.filter((bicho) => meusBichos.includes(bicho.id));

    console.log(dezenas);

    let acertos = 0;
    bichosFiltrados.forEach((bicho) => {
        bicho.dezenas.forEach((dezena) => {
            if (dezenas.includes(dezena)) {
                acertos++;
            }
        });
    });

    res.status(200).json({ message: "Você acertou " + acertos + " de " + dezenas.length });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log("To shutdown the server: ctrl + c");
});
