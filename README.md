# PlayBoy Caro - Website Oficial

Este é o repositório oficial do website do artista de trap nacional Murillo Lima, nome artístico "PlayBoy Caro". Desenvolvido com React, Vite, TailwindCSS e integrado com Supabase.

Gravadora: **GTTBOYS**
Localização: **Águas Lindas – GO / Brasília – DF, Brasil**

## 🎤 Contatos Oficiais
- Instagram Oficial: [@playboy_caro](https://www.instagram.com/playboy__caro)
- Instagram Pessoal: [@murilloo_sossa](https://www.instagram.com/murilloo_sossa)
- YouTube Oficial: [Murillo Lima (PlayBoy Caro)](https://www.youtube.com/@MurilloLimadossantos-b4h)

## ✨ Funcionalidades Principais

- **Design Impactante**: Interface escura com tema preto, vermelho escuro e dourado.
- **Responsividade Total**: Otimizado para desktops, tablets e celulares.
- **Animações Modernas**: Uso de Framer Motion.
- **Integração Supabase**: Para gerenciamento dinâmico de conteúdo e autenticação.

## 🛠️ Tecnologias Utilizadas

- React 18.2.0, Vite, React Router 6.16.0
- TailwindCSS 3.3.3, Framer Motion 10.16.4, Lucide React
- Supabase (Banco de Dados, Autenticação, Storage)

## 🚀 Estrutura do Projeto

```
/src
  /components
    /admin      # Componentes específicos do painel Admin
    /ui         # Componentes shadcn/ui
    # ... outros componentes
  /lib
    supabase.js # Configuração do cliente Supabase
    utils.js
  /pages
    Admin.jsx   # Lógica principal do painel Admin
    # ... outras páginas
  App.jsx
  main.jsx
# ... outros arquivos de configuração
```

## ⚙️ Configuração Inicial e Execução

### 1. Pré-requisitos
- Node.js (v20 ou superior)
- npm

### 2. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/playboy-caro-website.git
cd playboy-caro-website
```

### 3. Configure o Supabase

#### a. Crie seu Projeto Supabase
- Acesse [supabase.com](https://supabase.com) e crie um novo projeto.

#### b. Configure Variáveis de Ambiente
- As credenciais do Supabase (`supabaseUrl` e `supabaseAnonKey`) já estão configuradas em `src/lib/supabase.js` para este ambiente de desenvolvimento fornecido.
- **Para produção ou um ambiente local separado**, crie um arquivo `.env.local` na raiz do projeto com:
  ```env
  VITE_SUPABASE_URL=SUA_SUPABASE_URL
  VITE_SUPABASE_ANON_KEY=SUA_SUPABASE_ANON_KEY
  ```
  E ajuste `src/lib/supabase.js` para usar `import.meta.env.VITE_SUPABASE_URL` e `import.meta.env.VITE_SUPABASE_ANON_KEY`.

#### c. Crie as Tabelas no Supabase
Execute o seguinte SQL no Editor SQL do seu projeto Supabase:

```sql
-- Tabela para informações do artista (Home Page, contatos, etc.)
CREATE TABLE IF NOT EXISTS artist_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  artist_name TEXT DEFAULT 'PlayBoy Caro',
  banner_image_url TEXT,
  youtube_channel_url TEXT DEFAULT 'https://www.youtube.com/@MurilloLimadossantos-b4h',
  instagram_url TEXT DEFAULT 'https://www.instagram.com/@playboy_caro/',
  twitter_url TEXT, -- Opcional
  bio TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para galeria de músicas/vídeos
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT, -- URL da imagem de capa (do bucket 'images/music_banner')
  youtube_url TEXT, -- Link direto para o vídeo no YouTube
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para produtos da loja
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  image_url TEXT, -- URL da imagem do produto (do bucket 'images/products')
  tags TEXT[],
  category TEXT,
  stock INT4 DEFAULT 0,
  product_url TEXT, -- Link externo para compra, se houver
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela para usuários administradores (separada do Supabase Auth para este exemplo)
-- ATENÇÃO: Para um sistema de produção, use o sistema Supabase Auth integrado.
-- Esta tabela é APENAS para simular o login inicial com credenciais fixas.
-- A senha deve ser armazenada como hash na prática (ex: usando bcrypt).
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- Em produção, armazene um hash seguro
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insere usuário admin de exemplo (senha 'SenhaForte123!' - NÃO FAÇA ISSO EM PRODUÇÃO COM SENHA EM TEXTO PLANO)
-- Em um cenário real, gere o hash da senha antes de inserir.
-- Para este projeto, o frontend usa Supabase Auth, então esta tabela 'admin_users' não é usada para login real.
-- O login no Admin.jsx usa supabase.auth.signInWithPassword().
-- Apenas para referência de estrutura.
INSERT INTO admin_users (email, password_hash)
SELECT 'admin@playboycaro.com', 'hash_da_SenhaForte123!' -- Substitua 'hash_da_SenhaForte123!' por um hash real se for usar.
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE email = 'admin@playboycaro.com');


-- Seed artist_info se estiver vazia (ajuste os URLs conforme necessário)
INSERT INTO artist_info (artist_name, banner_image_url, youtube_channel_url, instagram_url, twitter_url, bio)
SELECT
  'PlayBoy Caro',
  'https://images.unsplash.com/photo-1700940948230-465ebc062a06', -- URL de banner placeholder
  'https://www.youtube.com/@MurilloLimadossantos-b4h',
  'https://www.instagram.com/@playboy_caro/',
  'https://twitter.com/playboycaro_oficial', -- Exemplo
  'Murillo Lima, o fenômeno do trap nacional. Explore o universo sonoro do artista.'
WHERE NOT EXISTS (SELECT 1 FROM artist_info);

-- Habilitar RLS (Row Level Security) - IMPORTANTE para segurança
ALTER TABLE artist_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY; -- Se for usar esta tabela

-- Políticas de Acesso (Exemplos)
-- Leitura pública para artist_info, gallery, products
CREATE POLICY "Public read access for artist_info" ON artist_info FOR SELECT USING (true);
CREATE POLICY "Public read access for gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);

-- Acesso total para administradores autenticados (CRUD)
-- (O login no Admin.jsx usa Supabase Auth, então 'authenticated' role se aplica)
CREATE POLICY "Admin full access for artist_info" ON artist_info FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin full access for products" ON products FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Se for usar a tabela admin_users para algo além de referência:
-- CREATE POLICY "Admin users read access" ON admin_users FOR SELECT USING (auth.role() = 'authenticated');
```

#### d. Crie o Bucket de Armazenamento
- No painel do Supabase, vá para "Storage".
- Clique em "Create new bucket".
- Nome do Bucket: `images`
- Marque "Public bucket".
- Clique em "Create bucket".
- Dentro do bucket `images`, crie as pastas:
  - `products`
  - `music_banner`
  (Você pode criar pastas clicando no bucket, depois "Create folder").

### 4. Instale as Dependências
```bash
npm install
```

### 5. Execute o Servidor de Desenvolvimento
```bash
npm run dev
```
O site estará disponível em `http://localhost:5173` (ou a porta indicada pelo Vite).

### 6. Acesse o Painel Admin
- Navegue para `/admin`.
- Use as credenciais de exemplo (se o login Supabase Auth estiver configurado com elas, ou as credenciais fixas exibidas no card para simulação):
  - Email: `admin@playboycaro.com`
  - Senha: `SenhaForte123!`

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run start` ou `npm run preview`: Visualiza o build de produção.

## 🎨 Design e Estilo
- **Paleta de Cores**: Preto (`#000000`), Branco (`#FFFFFF`), Vermelho Escuro (`#8B0000`), Amarelo Dourado (`#FFD700`).
- **Efeitos**: Gradientes, glassmorphism sutil, animações suaves.

## ✅ Verificação Final (Após Configuração)
1.  **Login no Admin**: Verifique se o login funciona e se o card com credenciais de exemplo é exibido (se aplicável).
2.  **Upload de Imagens**:
    - No painel Admin, tente adicionar um novo item na galeria ou um novo produto.
    - Faça upload de uma imagem.
    - Verifique se a imagem aparece no bucket `images` (na pasta correta) no Supabase.
    - Verifique se a URL pública da imagem é salva corretamente no banco de dados (`gallery.image_url` ou `products.image_url`).
3.  **Exibição no Frontend**:
    - Navegue para a Galeria e Loja.
    - Verifique se os cards de música e produtos exibem as imagens carregadas.
    - Teste os botões "Ver no YouTube" (Galeria) e "Comprar" (Loja).
4.  **Dados de Exemplo**: Verifique se os dados fictícios inseridos inicialmente aparecem corretamente.

## 🤝 Contribuições
Contribuições são bem-vindas!
1.  Fork o projeto.
2.  Crie uma branch (`git checkout -b feature/MinhaFeature`).
3.  Commit suas alterações (`git commit -m 'Adiciona MinhaFeature'`).
4.  Push para a branch (`git push origin feature/MinhaFeature`).
5.  Abra um Pull Request.

---

*Website Oficial de PlayBoy Caro - GTTBOYS - Elevando o Trap Nacional.*
