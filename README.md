# Conta Minha

Um app React Native (Expo) para gerenciar contas mensais: criar, marcar como pagas e visualizar status.

![Expo](https://img.shields.io/badge/Expo-53.0.0-blue) ![React Native](https://img.shields.io/badge/React_Native-0.75.0-blue?logo=react) ![License](https://img.shields.io/badge/license-MIT-green)

## Sumário

* [Funcionalidades](#funcionalidades)
* [Instalação](#instalação)
* [Uso](#uso)
* [Melhorias Futuras](#melhorias-futuras)
* [Licença](#licença)
* [Contato](#contato)

## Funcionalidades

* Adicionar contas com:

  * Nome
  * Data de vencimento (opcional)
  * Valor
  * Tipo (parcelada ou contínua)
* Marcar contas como pagas
* Armazenamento local com AsyncStorage

### Ícones de status

* ✅ Todas as contas pagas
* ⚠️ Contas vencidas e não pagas
* ⏳ Contas pendentes

## Tecnologias Utilizadas

* React Native
* Expo
* Zustand (gerenciamento de estado)
* AsyncStorage (armazenamento local)

## Instalação

```bash
# Clone o repositório
git clone git@github.com:wesleibl/conta-minha.git

# Acesse a pasta do projeto
cd conta-minha

# Instale as dependências
npm install  # ou yarn install
```

## Uso

```bash
# Inicie o aplicativo
npx expo start
```

## Melhorias Futuras

* Integração com backend
* Login com Google para sincronização dos dados
* Dashboard com gráficos

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato: [wesleibl@gmail.com](mailto:wesleibl@gmail.com)
