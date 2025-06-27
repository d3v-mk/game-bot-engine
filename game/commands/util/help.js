/**
 * Comando !help
 * 
 * Esse comando responde com uma lista de comandos disponíveis no bot.
 * Ideal pra mostrar ao jogador/usuário tudo que ele pode fazer no sistema.
 * 
 * O comando é acionado quando o usuário digita: !help
 * 
 */

export default async function help(msg) {
  return msg.reply(`
- !ComandoAqui
- !ComandoAqui
- !ComandoAqui
  `);
}
