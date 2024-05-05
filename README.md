# 🔍 Intelligent Search

![Discord](https://img.shields.io/discord/803323840527728670?label=TECSmith&style=social) ![Twitter Follow](https://img.shields.io/twitter/follow/tecsmith_info?style=social)

## Assignment Briefing

This task is to create a proof of concept for a free-form textual input search, as an alternative to our normal search bar where you specify location, dates, and travelers.

The search input should present the relevant understood information and offer ways to correct it, perhaps inline. When all input is done, the user should be redirected to the existing search flow.

## Technical Requirements

Frontend part should be a React component that we can insert into our existing frontend. adaptive to its surrounding dimensions. It may be shown like the current search bar (switching between the two) or perhaps in a widget, so the size available could be tiny or very large.

Backend part should be a minimal Node Express server.
As for which AI API to use, is up to you. Natural
Language or Vertex APIs might be interesting?

-- [CityCity](https://www.citycity.se/)

# 🔍 Freeform Text Search Application

Prepare to embark on an extraordinary search journey with my AI-powered text search application. This cutting-edge solution seamlessly blends many capabilities to deliver an unparalleled search experience.

**Harnessing the Power of AI for Enhanced Search Experiences**

This innovative application leverages the transformative power of artificial intelligence to analyze search queries with unparalleled precision. By understanding the intent behind each query, my AI engine provides accurate results and intelligent correction suggestions.

**A Symphony of Technologies**

|🖥️ [FRONTEND](https://github.com/tec-smith/assignment-ai-search/tree/main/client) | 💽 [BACKEND](https://github.com/tec-smith/assignment-ai-search/tree/main/server) |

At the heart of this application lies a harmonious blend of technologies:

- **TypeScript and Node.js (Express):** A robust backend that ensures seamless data handling and server-side operations.
- **TypeScript and React:** A dynamic frontend that provides an intuitive and user-friendly search interface.
- **Google Vertex AI:**
  - **AutoML Natural Language**
  To train my custom NLP model that can interpret the user's free-form text input. The model has been trained on a dataset of travel-related queries.
  - **Dialogflow**
  To guide the user through the search process. This conversational agent can ask the user follow-up questions to clarify any ambiguous information.
  - **Fulfillment**
  I am using Google Cloud Functions to create processes for the user's input and construct the redirect URL to service the request.

**A Commitment to Excellence**

This application is meticulously documented, ensuring that every aspect of its functionality is crystal clear. I am dedicated to providing a comprehensive and accessible resource for developers and users alike.

Please don't forget to [read the security policy](SECURITY.md) to ensure that you fully understand the associated risks (if any) before proceeding with deploying this application into a live production environment.

## 🎁 Contribute

*Your contributions are greatly appreciated, thank you very much!*

![GitHub last commit](https://img.shields.io/github/last-commit/tec-smith/assignment-ai-search?style=flat-square) ![GitHub contributors](https://img.shields.io/github/contributors/tec-smith/assignment-ai-search?style=flat-square)

### ☕ Develop

Pull requests are welcome, but for major changes, please open an issue to discuss what you would like changed, removed or updated.

### 🙏 Donate

Has this solution helped you? Scan the QR code below to send a monetary amount via PayPal.
Alternatively, you may [click here to buy me a beverage!](https://www.buymeacoffee.com/tecsmith)

<img src="https://tecsmith.info/assets/images/tip_qrc.webp" width="200" height="200" />

## 💌 History

Version changes documented and [available here](CHANGELOG.md).

## ⚖️ License 
    @COPYRIGHT (c) 2024. Thomas EC. Smith. All rights reserved.
