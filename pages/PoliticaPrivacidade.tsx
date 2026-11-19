import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

export default function PoliticaPrivacidade() {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade — Casamento a Bordo</title>
        <meta
          name="description"
          content="Política de Privacidade do site Casamento a Bordo. Saiba como tratamos seus dados pessoais conforme a LGPD."
        />
      </Helmet>

      <div className="min-h-screen bg-pearl">
        {/* Header */}
        <header className="bg-navy text-white py-16 md:py-24">
          <div className="container-custom">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-pearl/60 hover:text-white text-sm font-semibold mb-8 transition-colors"
            >
              <ArrowLeft size={16} /> Voltar ao site
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Shield size={24} className="text-accent" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Política de Privacidade
              </h1>
            </div>
            <p className="text-pearl/60 text-sm font-semibold uppercase tracking-widest mt-4">
              Última atualização: 10 de março de 2026
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="container-custom py-16 md:py-24">
          <div className="max-w-4xl mx-auto prose-custom">
            {/* Intro */}
            <section className="legal-section">
              <p className="legal-text">
                A <strong>Casamento a Bordo</strong> (
                <a href="https://casamentoabordo.com.br" className="text-accent hover:underline">
                  casamentoabordo.com.br
                </a>
                ) tem o compromisso de proteger a privacidade e os dados pessoais de
                todos os usuários que visitam nosso site e utilizam nossos serviços.
                Esta Política de Privacidade descreve como coletamos, usamos,
                armazenamos e protegemos suas informações pessoais, em conformidade
                com a{" "}
                <strong>
                  Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)
                </strong>
                .
              </p>
              <p className="legal-text">
                Ao utilizar nosso site, você concorda com os termos descritos nesta
                Política. Recomendamos a leitura completa deste documento para que
                você entenda nossos procedimentos em relação aos seus dados pessoais.
              </p>
            </section>

            {/* 1. Dados Coletados */}
            <section className="legal-section">
              <h2 className="legal-h2">1. Quais Dados Coletamos</h2>
              <p className="legal-text">
                No decorrer da sua navegação e interação com o nosso site, podemos
                coletar os seguintes dados:
              </p>

              <h3 className="legal-h3">1.1 Dados fornecidos diretamente por você</h3>
              <ul className="legal-list">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>Número de telefone / WhatsApp</li>
                <li>Mensagens e informações enviadas por formulários de contato</li>
              </ul>

              <h3 className="legal-h3">1.2 Dados coletados automaticamente</h3>
              <ul className="legal-list">
                <li>Endereço IP (Protocolo de Internet)</li>
                <li>Tipo de navegador e sistema operacional</li>
                <li>Páginas visitadas e tempo de permanência</li>
                <li>Origem do acesso (referrer)</li>
                <li>Dados de cookies e tecnologias de rastreamento similares</li>
              </ul>
            </section>

            {/* 2. Como Coletamos */}
            <section className="legal-section">
              <h2 className="legal-h2">2. Como Coletamos Seus Dados</h2>
              <p className="legal-text">A coleta de dados pode ocorrer das seguintes formas:</p>
              <ul className="legal-list">
                <li>
                  <strong>Formulários do site:</strong> quando você preenche
                  formulários de contato, solicitação de orçamento ou download de
                  material.
                </li>
                <li>
                  <strong>WhatsApp:</strong> quando você nos contata via WhatsApp
                  através dos botões do site.
                </li>
                <li>
                  <strong>Cookies e tecnologias similares:</strong> utilizados para
                  coletar dados de navegação automaticamente.
                </li>
                <li>
                  <strong>Ferramentas de analytics:</strong> como Google Analytics,
                  para análise estatística de uso do site.
                </li>
              </ul>
            </section>

            {/* 3. Finalidade */}
            <section className="legal-section">
              <h2 className="legal-h2">3. Para Que Utilizamos Seus Dados</h2>
              <p className="legal-text">
                Os dados pessoais coletados são utilizados para as seguintes
                finalidades:
              </p>
              <ul className="legal-list">
                <li>Responder às suas solicitações de contato e orçamento</li>
                <li>
                  Enviar informações e propostas sobre nossos serviços de casamento a
                  bordo
                </li>
                <li>
                  Melhorar a experiência de navegação e personalização do site
                </li>
                <li>
                  Gerar relatórios estatísticos e análises para melhoria dos nossos
                  serviços
                </li>
                <li>
                  Cumprir obrigações legais e regulatórias aplicáveis
                </li>
                <li>
                  Garantir a segurança do site e prevenir atividades fraudulentas
                </li>
              </ul>
            </section>

            {/* 4. Compartilhamento */}
            <section className="legal-section">
              <h2 className="legal-h2">4. Compartilhamento de Dados</h2>
              <p className="legal-text">
                A Casamento a Bordo <strong>não vende, aluga ou comercializa</strong>{" "}
                seus dados pessoais com terceiros. Seus dados poderão ser
                compartilhados apenas nas seguintes situações:
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Prestadores de serviços:</strong> empresas que nos auxiliam
                  na operação do site (ex.: serviço de e-mail, analytics, hospedagem),
                  sempre sob obrigações de confidencialidade.
                </li>
                <li>
                  <strong>Obrigação legal:</strong> quando exigido por lei, ordem
                  judicial ou requisição de autoridade competente.
                </li>
                <li>
                  <strong>Proteção de direitos:</strong> em caso de necessidade para
                  proteger nossos direitos, segurança ou propriedade.
                </li>
              </ul>
            </section>

            {/* 5. Cookies */}
            <section className="legal-section">
              <h2 className="legal-h2">5. Uso de Cookies</h2>
              <p className="legal-text">
                Nosso site utiliza cookies e tecnologias similares para melhorar sua
                experiência de navegação. Cookies são pequenos arquivos de texto
                armazenados no seu dispositivo que nos ajudam a:
              </p>
              <ul className="legal-list">
                <li>Lembrar suas preferências de navegação</li>
                <li>Analisar o tráfego e uso do site</li>
                <li>Melhorar o desempenho e a funcionalidade do site</li>
                <li>Exibir conteúdo relevante para você</li>
              </ul>

              <h3 className="legal-h3">Tipos de cookies que utilizamos:</h3>
              <ul className="legal-list">
                <li>
                  <strong>Cookies essenciais:</strong> necessários para o funcionamento
                  básico do site.
                </li>
                <li>
                  <strong>Cookies de desempenho:</strong> coletam informações sobre
                  como os visitantes utilizam o site (ex.: Google Analytics).
                </li>
                <li>
                  <strong>Cookies de funcionalidade:</strong> permitem que o site
                  lembre de escolhas feitas por você.
                </li>
              </ul>
              <p className="legal-text">
                Você pode gerenciar ou desativar cookies nas configurações do seu
                navegador. Note que a desativação de cookies essenciais pode afetar o
                funcionamento do site.
              </p>
            </section>

            {/* 6. Segurança */}
            <section className="legal-section">
              <h2 className="legal-h2">6. Segurança da Informação</h2>
              <p className="legal-text">
                Adotamos medidas técnicas e organizacionais adequadas para proteger
                seus dados pessoais contra acesso não autorizado, destruição, perda,
                alteração ou qualquer forma de tratamento indevido. Entre as medidas
                adotadas, incluem-se:
              </p>
              <ul className="legal-list">
                <li>Criptografia de dados em trânsito (HTTPS/SSL)</li>
                <li>Controle de acesso restrito a dados pessoais</li>
                <li>Monitoramento constante de segurança</li>
                <li>Armazenamento seguro em servidores protegidos</li>
              </ul>
              <p className="legal-text">
                Embora nos esforcemos para proteger seus dados, nenhum sistema de
                segurança é completamente infalível. Em caso de incidente de segurança,
                tomaremos as medidas necessárias conforme previsto na LGPD.
              </p>
            </section>

            {/* 7. Direitos */}
            <section className="legal-section">
              <h2 className="legal-h2">7. Seus Direitos como Titular de Dados</h2>
              <p className="legal-text">
                De acordo com a LGPD (Lei nº 13.709/2018), você possui os seguintes
                direitos em relação aos seus dados pessoais:
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Confirmação e acesso:</strong> confirmar a existência de
                  tratamento e acessar seus dados pessoais.
                </li>
                <li>
                  <strong>Correção:</strong> solicitar a correção de dados incompletos,
                  inexatos ou desatualizados.
                </li>
                <li>
                  <strong>Anonimização, bloqueio ou eliminação:</strong> solicitar a
                  anonimização, bloqueio ou eliminação de dados desnecessários ou
                  excessivos.
                </li>
                <li>
                  <strong>Portabilidade:</strong> solicitar a portabilidade dos seus
                  dados a outro fornecedor de serviço.
                </li>
                <li>
                  <strong>Eliminação:</strong> solicitar a eliminação de dados pessoais
                  tratados com base no seu consentimento.
                </li>
                <li>
                  <strong>Informação sobre compartilhamento:</strong> obter
                  informações sobre entidades públicas e privadas com as quais
                  compartilhamos seus dados.
                </li>
                <li>
                  <strong>Revogação de consentimento:</strong> revogar seu
                  consentimento a qualquer momento, sem comprometer a licitude do
                  tratamento realizado anteriormente.
                </li>
              </ul>
            </section>

            {/* 8. Exclusão */}
            <section className="legal-section">
              <h2 className="legal-h2">
                8. Como Solicitar Exclusão ou Alteração de Dados
              </h2>
              <p className="legal-text">
                Para exercer qualquer um dos seus direitos listados acima, basta
                entrar em contato conosco através dos canais abaixo. Nos comprometemos
                a responder à sua solicitação no prazo de até 15 (quinze) dias úteis,
                conforme previsto na LGPD.
              </p>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/50 shadow-soft mt-6">
                <h3 className="legal-h3 mt-0">Canal de Privacidade e Dados</h3>
                <ul className="legal-list mb-0">
                  <li>
                    <strong>E-mail:</strong>{" "}
                    <a
                      href="mailto:contato@casamentoabordo.com.br"
                      className="text-accent hover:underline"
                    >
                      contato@casamentoabordo.com.br
                    </a>
                  </li>
                  <li>
                    <strong>Assunto do e-mail:</strong> "Solicitação LGPD — [Seu Nome]"
                  </li>
                  <li>
                    <strong>WhatsApp:</strong>{" "}
                    <a
                      href="https://wa.me/551938811824"
                      className="text-accent hover:underline"
                    >
                      (19) 3881-1824
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* 9. Alterações */}
            <section className="legal-section">
              <h2 className="legal-h2">9. Alterações nesta Política</h2>
              <p className="legal-text">
                Esta Política de Privacidade pode ser atualizada periodicamente para
                refletir mudanças em nossas práticas ou em requisitos legais.
                Recomendamos revisitar esta página regularmente. Qualquer alteração
                significativa será comunicada por meio do nosso site.
              </p>
            </section>

            {/* 10. Contato */}
            <section className="legal-section">
              <h2 className="legal-h2">10. Contato</h2>
              <p className="legal-text">
                Se você tiver qualquer dúvida, preocupação ou solicitação sobre esta
                Política de Privacidade ou sobre o tratamento dos seus dados pessoais,
                entre em contato conosco:
              </p>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/50 shadow-soft mt-6">
                <p className="legal-text mb-2">
                  <strong>Casamento a Bordo</strong>
                </p>
                <p className="legal-text mb-2">
                  E-mail:{" "}
                  <a
                    href="mailto:contato@casamentoabordo.com.br"
                    className="text-accent hover:underline"
                  >
                    contato@casamentoabordo.com.br
                  </a>
                </p>
                <p className="legal-text mb-2">
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/551938811824"
                    className="text-accent hover:underline"
                  >
                    (19) 3881-1824
                  </a>
                </p>
                <p className="legal-text mb-0">
                  Site:{" "}
                  <a
                    href="https://casamentoabordo.com.br"
                    className="text-accent hover:underline"
                  >
                    casamentoabordo.com.br
                  </a>
                </p>
              </div>
            </section>
          </div>
        </main>

        {/* Footer mini */}
        <footer className="bg-navy py-8">
          <div className="container-custom text-center">
            <p className="text-pearl/30 text-xs font-bold uppercase tracking-widest">
              © 2026 Casamento a Bordo — Todos os direitos reservados
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Link to="/politica-de-privacidade" className="text-pearl/40 hover:text-white text-xs transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/lgpd" className="text-pearl/40 hover:text-white text-xs transition-colors">
                LGPD
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
