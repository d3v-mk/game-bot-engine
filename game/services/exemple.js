/**
 * 📁 game/service/ — Para que serve essa pasta?
 *
 * A pasta `service/` abriga a lógica de negócio da aplicação.
 * Ela serve pra isolar o “O QUE o bot faz” da camada que lida com o “QUANDO ou COMO ele faz”.
 *
 * 💡 Diferença:
 * - Comando/handler: "Quando o jogador digita !payday"
 * - Service: "O que acontece quando ele coleta o payday"
 *
 * 🔄 Regras de negócio vão aqui:
 * - Aplicar lógica do jogo (XP, movimentação, cooldown, etc)
 * - Buscar, criar ou atualizar dados no banco (via Prisma)
 * - Tratar e validar dados antes de responder
 * - Gerar respostas ou resultados prontos pro comando enviar
 *
 * ✅ Vantagens:
 * - Código limpo e organizado
 * - Reutilizável por outras interfaces (bot, API, testes)
 * - Fácil de testar e manter
 *
 * 💡 Exemplo de uso:
 * Comando: game/commands/payday.js
 * → chama: game/services/paydayService.js
 * → busca jogador, verifica cooldown, aplica XP, retorna resposta
 *
 * Este arquivo é apenas um modelo. Crie arquivos separados por domínio, como:
 * - jogadorService.js
 * - paydayService.js
 *
 */
