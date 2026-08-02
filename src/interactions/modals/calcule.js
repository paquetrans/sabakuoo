const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("calcular")
        .setDescription("Faz um cálculo matemático.")
        .addStringOption(option =>
            option
                .setName("conta")
                .setDescription("Exemplo: 10+5*2")
                .setRequired(true)
        ),

    async execute(interaction) {
        const conta = interaction.options.getString("conta");

        try {
            // Permite apenas números, espaços, parênteses e operadores
            if (!/^[0-9+\-*/().\s]+$/.test(conta)) {
                return interaction.reply({
                    content: " Digite apenas números e operadores matemáticos (+, -, *, /).",
                    ephemeral: true
                });
            }

            const resultado = Function(`"use strict"; return (${conta})`)();

            await interaction.reply(` **Cálculo:** \`${conta}\`\n **Resultado:** \`${resultado}\``);
        } catch {
            await interaction.reply({
                content: " Não foi possível calcular essa expressão.",
                ephemeral: true
            });
        }
    },
};
