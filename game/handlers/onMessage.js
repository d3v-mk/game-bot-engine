/**
 * Sistema de Comandos Dinâmicos para Bot WhatsApp
 * 
 * Esse módulo carrega automaticamente todos os arquivos `.js` da pasta `commands`
 * (inclusive os que estão em subpastas), e executa o comando correto quando o usuário
 * envia uma mensagem começando com `!`.
 * 
 * Como funciona:
 * - Lê recursivamente a pasta `commands`
 * - Importa dinamicamente os comandos (export default)
 * - Usa o nome do arquivo como nome do comando (ex: `ping.js` vira `!ping`)
 * - No evento `onMessage`, identifica o comando digitado e executa a função correspondente
 * 
 * Exemplo de uso no WhatsApp:
 * User envia: `!ping`
 * O bot executa: comando exportado de `commands/ping.js`
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Captura o diretório atual (porque não tem __dirname em ESM)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Caminho absoluto da pasta de comandos
const commandsDir = path.resolve(__dirname, '../commands');

// Objeto onde ficarão todos os comandos carregados dinamicamente
const commands = {};

// Função recursiva que lê a pasta de comandos e importa os arquivos .js
async function carregarComandos(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Se for uma subpasta, chama a função novamente
      await carregarComandos(fullPath);
    } else if (file.endsWith('.js')) {
      // Cria o nome do comando com base no nome do arquivo
      const commandName = '!' + file.replace('.js', '');
      const fileUrl = pathToFileURL(fullPath).href;
      const commandModule = await import(fileUrl);
      commands[commandName] = commandModule.default;
    }
  }
}

// Carrega todos os comandos antes de responder mensagens
await carregarComandos(commandsDir);

// Função chamada ao receber uma nova mensagem no bot
export default async function onMessage(msg) {
  const texto = msg.body.trim(); // Remove espaços extras
  const [cmd, ...args] = texto.split(' '); // Separa o comando dos argumentos

  const comando = commands[cmd]; // Busca o comando no dicionário carregado

  if (comando) {
    return comando(msg, args); // Executa o comando com a mensagem e os argumentos
  }

  // Se a mensagem começa com "!" mas não é um comando conhecido
  if (cmd.startsWith('!')) {
    return msg.reply('❓ Comando desconhecido. Use !help');
  }

  // Se não for comando, o bot ignora na moralzinha
}
