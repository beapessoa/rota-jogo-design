export interface Question {
  text: string;
  options: string[];
  correct: number;
}

export const questionBank: Record<string, Question[]> = {
  Matemática: [
    { text: 'A razão 2/5 corresponde a qual porcentagem?', options: ['20%', '25%', '40%', '50%'], correct: 2 },
    { text: 'Um produto custava R$ 80 e teve desconto de 25%. Qual o novo preço?', options: ['R$ 60', 'R$ 55', 'R$ 65', 'R$ 70'], correct: 0 },
    { text: 'Na função f(x) = 2x + 3, o valor de f(4) é:', options: ['9', '10', '11', '14'], correct: 2 },
    { text: 'A área de um triângulo de base 10 cm e altura 6 cm é:', options: ['30 cm²', '60 cm²', '16 cm²', '36 cm²'], correct: 0 },
    { text: 'Ao lançar um dado comum, a probabilidade de sair número par é:', options: ['1/6', '1/3', '1/2', '2/3'], correct: 2 },
  ],
  Física: [
    { text: 'A unidade de força no Sistema Internacional é:', options: ['joule', 'newton', 'watt', 'pascal'], correct: 1 },
    { text: 'Um corpo em queda livre próximo à superfície da Terra tem aceleração de aproximadamente:', options: ['5 m/s²', '9,8 m/s²', '15 m/s²', '20 m/s²'], correct: 1 },
    { text: 'A potência de um aparelho de 220 V percorrido por 2 A é:', options: ['110 W', '220 W', '440 W', '880 W'], correct: 2 },
    { text: 'Em um movimento uniforme, o gráfico posição × tempo é:', options: ['uma reta', 'uma parábola', 'uma hipérbole', 'uma senoide'], correct: 0 },
    { text: 'A energia cinética de um corpo depende de:', options: ['massa e altura', 'massa e velocidade', 'apenas da massa', 'apenas da velocidade'], correct: 1 },
  ],
  Química: [
    { text: 'O número atômico de um elemento corresponde ao número de:', options: ['nêutrons', 'prótons', 'elétrons livres', 'isótopos'], correct: 1 },
    { text: 'Uma solução de pH 3 é:', options: ['básica', 'neutra', 'ácida', 'anfótera'], correct: 2 },
    { text: 'A fórmula do gás carbônico é:', options: ['CO', 'CO₂', 'C₂O', 'CaO'], correct: 1 },
    { text: 'A ligação entre sódio e cloro no sal de cozinha é:', options: ['covalente', 'iônica', 'metálica', 'de hidrogênio'], correct: 1 },
    { text: 'Um mol de qualquer substância contém aproximadamente:', options: ['6,02 × 10²³ partículas', '3,14 × 10²³ partículas', '10⁶ partículas', '1000 partículas'], correct: 0 },
  ],
  Biologia: [
    { text: 'A organela responsável pela respiração celular é:', options: ['ribossomo', 'mitocôndria', 'lisossomo', 'complexo de Golgi'], correct: 1 },
    { text: 'Na fotossíntese, as plantas consomem:', options: ['CO₂ e água', 'O₂ e glicose', 'N₂ e água', 'CO₂ e glicose'], correct: 0 },
    { text: 'O DNA é formado por quais bases nitrogenadas?', options: ['A, T, C, G', 'A, U, C, G', 'A, T, U, G', 'T, U, C, G'], correct: 0 },
    { text: 'Em um cruzamento Aa × Aa, a proporção fenotípica esperada é:', options: ['1:1', '3:1', '9:3:3:1', '1:2:1'], correct: 1 },
    { text: 'O principal órgão de absorção de nutrientes no corpo humano é:', options: ['estômago', 'intestino delgado', 'fígado', 'intestino grosso'], correct: 1 },
  ],
};
