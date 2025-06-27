/**
 * 🤖 Inicialização do Bot WhatsApp com whatsapp-web.js
 *
 * Esse script cria e inicia um bot no WhatsApp usando a biblioteca `whatsapp-web.js`.
 * Ele autentica via QR code, escuta mensagens e responde de forma personalizada.
 * 
 * 📌 Funcionalidades:
 * - Geração de QR code para login via terminal
 * - Autenticação persistente com `LocalAuth`
 * - Resposta automática via função `onMessage`
 * 
 * Obs: Ideal para bots simples que interagem via WhatsApp Web.
 * Rode: node game/index.js
 */

import pkg from 'whatsapp-web.js'; // Importa o pacote principal do WhatsApp Web API
import qrcode from 'qrcode-terminal'; // Utilitário para mostrar o QR code no terminal
import onMessage from './handlers/onMessage.js'; // Função personalizada para lidar com mensagens recebidas

const { Client, LocalAuth } = pkg; // Desestrutura as classes Client e LocalAuth do pacote

// Cria a instância do cliente do WhatsApp com autenticação local e configs do Puppeteer
const client = new Client({
  authStrategy: new LocalAuth(), // Salva a sessão localmente pra não precisar logar toda vez
  puppeteer: {
    headless: true, // Roda o navegador em modo invisível (sem GUI)
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Flags de segurança, úteis em servidores
  }
});

// Evento disparado quando o QR code é gerado (para login no WhatsApp)
client.on('qr', qr => {
  console.log('📸 Escaneie o QR code abaixo para logar no WhatsApp:');
  qrcode.generate(qr, { small: true }); // Mostra o QR code no terminal
});

// Evento disparado quando o bot está pronto para uso
client.on('ready', () => {
  console.log('✅ Bot conectado ao WhatsApp!');
});

// Evento disparado a cada nova mensagem recebida
client.on('message', async msg => {
  try {
    await onMessage(msg); // Passa a mensagem para o handler externo
  } catch (e) {
    console.error('❌ Erro ao processar mensagem:', e); // Captura e exibe erros
  }
});

// Inicializa o cliente (abre o navegador e inicia a sessão)
client.initialize();
