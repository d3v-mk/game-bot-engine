/*
 * Script para rodar arquivos de seed manualmente
 * 
 * Este arquivo executa scripts de seed localizados na pasta `seed/`.
 * Use para popular o banco de dados com dados iniciais (mapas do jogo (locais), gangs, orgs, configurações, etc).
 * Tudo que o que existir in-game que for pre-setado
 * Basta adicionar os arquivos de seed desejados dentro da função `main()` abaixo,
 * e rodar o script com: `node nome_desse_arquivo.js`
 * 
 */

import { execSync } from 'child_process';

function runSeed(file) {
  console.log(`Rodando seed: ${file}`);
  execSync(`node seed/${file}`, { stdio: 'inherit' });
}

async function main() {
  runSeed('seedExemplo.js');
  // Adicione aqui outros seeds se quiser rodar vários em sequência
}

main();
