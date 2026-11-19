import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Scale } from "lucide-react";

export default function LGPD() {
  return (
    <>
      <Helmet>
        <title>LGPD — Proteção de Dados | Casamento a Bordo</title>
        <meta
          name="description"
          content="Conheça o compromisso do Casamento a Bordo com a Lei Geral de Proteção de Dados (LGPD). Saiba seus direitos como titular de dados."
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
                <Scale size={24} className="text-accent" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                LGPD — Proteção de Dados
              </h1>
            </div>
            <p className="text-pearl/60 text-sm font-semibold uppercase tracking-widest mt-4">
              Lei Geral de Proteção de Dados — Lei nº 13.709/2018
            </p>
            <p className="text-pearl/40 text-xs font-semibold uppercase tracking-widest mt-2">
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
                A <strong>Casamento a Bordo</strong> reconhece a importância da
                proteção de dados pessoais e está comprometida em garantir a
                privacidade e a segurança das informações de todos os usuários,
                clientes e visitantes do nosso site, em conformidade com a{" "}
                <strong>
                  Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)
                </strong>
                .
              </p>
              <p className="legal-text">
                Esta página foi criada para esclarecer como tratamos os dados pessoais,
                quais são os seus direitos como titular e como você pode exercê-los.
              </p>
            </section>

            {/* 1. Compromisso */}
            <section className="legal-section">
              <h2 className="legal-h2">1. Nosso Compromisso com a LGPD</h2>
              <p className="legal-text">
                A Casamento a Bordo se compromete a:
              </p>
              <ul className="legal-list">
                <li>
                  Tratar dados pessoais de forma transparente, lícita e com finalidades
                  definidas
                </li>
                <li>
                  Coletar apenas os dados estritamente necessários para a prestação dos
                  nossos serviços
                </li>
                <li>
                  Proteger os dados pessoais contra acessos não autorizados, vazamentos
                  e tratamento inadequado
                </li>
                <li>
                  Respeitar e garantir os direitos dos titulares de dados pessoais
                </li>
                <li>
                  Manter políticas e práticas de governança de dados compatíveis com a
                  legislação vigente
                </li>
              </ul>
            </section>

            {/* 2. Base Legal */}
            <section className="legal-section">
              <h2 className="legal-h2">2. Base Legal para o Tratamento de Dados</h2>
              <p className="legal-text">
                O tratamento dos seus dados pessoais pela Casamento a Bordo é
                fundamentado nas seguintes bases legais previstas na LGPD (Art. 7º):
              </p>

              <div className="space-y-4 mt-6">
                <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-soft">
                  <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-2">
                    Consentimento (Art. 7º, I)
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Quando você preenche nossos formulários de contato e fornece seus
                    dados voluntariamente, está consentindo com o tratamento das
                    informações para as finalidades descritas.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-soft">
                  <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-2">
                    Legítimo Interesse (Art. 7º, IX)
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Para enviar informações relevantes sobre nossos serviços e para
                    análise estatística de uso do site, sempre respeitando seus
                    direitos fundamentais.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-soft">
                  <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-2">
                    Execução de Contrato (Art. 7º, V)
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Quando o tratamento de dados é necessário para a execução de
                    contrato ou de procedimentos preliminares relacionados à prestação
                    dos nossos serviços.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-soft">
                  <h3 className="font-bold text-primary text-sm uppercase tracking-widest mb-2">
                    Cumprimento de Obrigação Legal (Art. 7º, II)
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Quando o tratamento é necessário para o cumprimento de obrigação
                    legal ou regulatória.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Direitos do Titular */}
            <section className="legal-section">
              <h2 className="legal-h2">3. Seus Direitos como Titular de Dados</h2>
              <p className="legal-text">
                A LGPD garante a você, titular de dados pessoais, uma série de
                direitos que podem ser exercidos a qualquer momento. São eles:
              </p>

              <div className="grid gap-4 mt-6 sm:grid-cols-2">
                {[
                  {
                    title: "Acesso aos dados",
                    desc: "Solicitar uma cópia de todos os dados pessoais que mantemos sobre você.",
                  },
                  {
                    title: "Correção",
                    desc: "Solicitar a correção de dados incompletos, inexatos ou desatualizados.",
                  },
                  {
                    title: "Exclusão (Eliminação)",
                    desc: "Solicitar a exclusão dos seus dados pessoais tratados com base no consentimento.",
                  },
                  {
                    title: "Portabilidade",
                    desc: "Solicitar a transferência dos seus dados pessoais a outro fornecedor de serviços.",
                  },
                  {
                    title: "Revogação do consentimento",
                    desc: "Retirar o consentimento dado anteriormente, sem comprometer o tratamento já realizado.",
                  },
                  {
                    title: "Oposição",
                    desc: "Opor-se ao tratamento de dados quando realizado com base em legítimo interesse.",
                  },
                  {
                    title: "Anonimização ou bloqueio",
                    desc: "Solicitar a anonimização, bloqueio ou eliminação de dados excessivos ou desnecessários.",
                  },
                  {
                    title: "Informação sobre compartilhamento",
                    desc: "Saber com quais entidades seus dados pessoais foram compartilhados.",
                  },
                ].map((right, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-elevated transition-shadow duration-300"
                  >
                    <h3 className="font-bold text-primary text-base mb-2">
                      {right.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {right.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Como Exercer */}
            <section className="legal-section">
              <h2 className="legal-h2">4. Como Exercer Seus Direitos</h2>
              <p className="legal-text">
                Para exercer qualquer um dos direitos acima, basta nos contatar por um
                dos canais abaixo, informando:
              </p>
              <ul className="legal-list">
                <li>Seu nome completo</li>
                <li>Endereço de e-mail vinculado ao cadastro</li>
                <li>O direito que deseja exercer</li>
                <li>Descrição detalhada da solicitação</li>
              </ul>
              <p className="legal-text">
                As solicitações serão respondidas em até{" "}
                <strong>15 (quinze) dias úteis</strong>, podendo ser prorrogado por
                igual período em casos que exijam maior complexidade, conforme
                previsto pela LGPD.
              </p>

              <div className="bg-accent/5 rounded-2xl p-6 md:p-8 border border-accent/20 mt-6">
                <h3 className="font-bold text-accent text-lg mb-4">
                  📧 Canal de Solicitações LGPD
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <strong className="text-primary min-w-[100px]">E-mail:</strong>
                    <a
                      href="mailto:contato@casamentoabordo.com.br"
                      className="text-accent hover:underline"
                    >
                      contato@casamentoabordo.com.br
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-primary min-w-[100px]">Assunto:</strong>
                    <span className="text-muted-foreground">
                      "Solicitação LGPD — [Seu Nome]"
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <strong className="text-primary min-w-[100px]">WhatsApp:</strong>
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

            {/* 5. Retenção */}
            <section className="legal-section">
              <h2 className="legal-h2">5. Política de Retenção de Dados</h2>
              <p className="legal-text">
                Os dados pessoais coletados serão armazenados pelo tempo necessário
                para cumprir as finalidades para as quais foram coletados, observando
                os seguintes critérios:
              </p>
              <ul className="legal-list">
                <li>
                  <strong>Dados de formulários de contato:</strong> mantidos por até 2
                  (dois) anos após o último contato, salvo quando houver relação
                  contratual vigente.
                </li>
                <li>
                  <strong>Dados de navegação (cookies/analytics):</strong> conforme
                  política de retenção da ferramenta utilizada (ex.: Google Analytics —
                  até 26 meses).
                </li>
                <li>
                  <strong>Dados contratuais:</strong> mantidos pelo prazo necessário ao
                  cumprimento de obrigações legais, fiscais e regulatórias (mínimo de 5
                  anos, conforme legislação aplicável).
                </li>
              </ul>
              <p className="legal-text">
                Após o término do período de retenção, os dados serão eliminados de
                forma segura ou anonimizados.
              </p>
            </section>

            {/* 6. Responsável */}
            <section className="legal-section">
              <h2 className="legal-h2">6. Responsável pelo Tratamento de Dados</h2>
              <p className="legal-text">
                O responsável pelo tratamento de dados pessoais (Controlador) é:
              </p>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/50 shadow-soft mt-6">
                <p className="legal-text mb-2">
                  <strong>Casamento a Bordo</strong>
                </p>
                <p className="legal-text mb-2">
                  Site:{" "}
                  <a
                    href="https://casamentoabordo.com.br"
                    className="text-accent hover:underline"
                  >
                    casamentoabordo.com.br
                  </a>
                </p>
                <p className="legal-text mb-2">
                  E-mail do Encarregado (DPO):{" "}
                  <a
                    href="mailto:contato@casamentoabordo.com.br"
                    className="text-accent hover:underline"
                  >
                    contato@casamentoabordo.com.br
                  </a>
                </p>
                <p className="legal-text mb-0">
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/551938811824"
                    className="text-accent hover:underline"
                  >
                    (19) 3881-1824
                  </a>
                </p>
              </div>
              <p className="legal-text mt-6">
                O encarregado de proteção de dados (DPO) é o profissional responsável
                por atuar como canal de comunicação entre a Casamento a Bordo, os
                titulares de dados e a Autoridade Nacional de Proteção de Dados
                (ANPD). Qualquer solicitação ou comunicação pode ser realizada pelo
                e-mail acima.
              </p>
            </section>

            {/* 7. ANPD */}
            <section className="legal-section">
              <h2 className="legal-h2">
                7. Autoridade Nacional de Proteção de Dados (ANPD)
              </h2>
              <p className="legal-text">
                Caso considere que o tratamento dos seus dados pessoais não está em
                conformidade com a LGPD, você pode apresentar uma reclamação à
                Autoridade Nacional de Proteção de Dados (ANPD):
              </p>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/50 shadow-soft mt-6">
                <p className="legal-text mb-2">
                  <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong>
                </p>
                <p className="legal-text mb-2">
                  Site:{" "}
                  <a
                    href="https://www.gov.br/anpd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    www.gov.br/anpd
                  </a>
                </p>
                <p className="legal-text mb-0">
                  Endereço: Esplanada dos Ministérios, Bloco C, Brasília/DF
                </p>
              </div>
            </section>

            {/* 8. Disposições Finais */}
            <section className="legal-section">
              <h2 className="legal-h2">8. Disposições Finais</h2>
              <p className="legal-text">
                Esta página pode ser atualizada a qualquer momento para refletir
                mudanças nas nossas práticas de proteção de dados ou alterações
                legislativas. Recomendamos que visite esta página periodicamente.
              </p>
              <p className="legal-text">
                Em caso de dúvidas sobre este documento ou sobre como tratamos seus
                dados pessoais, entre em contato conosco.
              </p>
              <p className="legal-text mt-8 text-muted-foreground italic">
                "A privacidade dos seus dados é tão importante quanto a realização
                dos seus sonhos. Conte com a Casamento a Bordo para cuidar de
                ambos."
              </p>
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
