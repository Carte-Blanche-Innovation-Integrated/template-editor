# Template Editor

## Overview

Template Editor is a React-based project that provides a powerful text editor with variable insertion capabilities.
The editor is built with the TipTap editor, allowing users to insert predefined variables into their text.
This is particularly useful for creating templates where certain fields need to be dynamically populated.
The project utilizes modern front-end technologies including React, TypeScript, TailwindCSS, Vite, Prettier, and ESLint.

[Live Preview](https://carte-blanche-innovation-integrated.github.io/template-editor/)

## Features

- **Rich Text Editing**: Powered by TipTap's `StarterKit` for comprehensive text editing capabilities.
- **Variable Insertion**: Easily insert predefined variables using a custom extension.
- **Suggestions Dropdown**: A suggestion dropdown that appears when typing a variable trigger character (`$`), showing possible variable options.
- **Customizable**: Extend and customize the editor to fit various use cases and requirements.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript.
- **TailwindCSS**: A utility-first CSS framework.
- **Vite**: A fast and optimized build tool.
- **TipTap**: A headless editor framework for building rich text editors.
- **Prettier**: A code formatter to ensure a consistent code style.
- **ESLint**: A tool for identifying and fixing linting issues in JavaScript/TypeScript code.

## Project Structure

The project is structured as follows:

```
src/
├── components/
│   ├── extension-variables/
│   │   ├── index.ts
│   │   ├── suggestion.ts
│   │   └── VariablesList.tsx
│   ├── Editor.tsx
│   └── styles.css
├── App.tsx
├── index.tsx
├── main.tsx
└── vite-env.d.ts
```

### Key Files

- **extension-variables/index.ts**: Defines the `VariableNode` extension for TipTap.
- **extension-variables/suggestion.ts**: Manages the suggestion plugin and its behavior.
- **extension-variables/VariablesList.tsx**: React component for rendering the suggestion dropdown list.
- **components/Editor.tsx**: Main editor component utilizing TipTap and the variable extension.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Carte-Blanche-Innovation-Integrated/text-highlighter.git
   cd text-highlighter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## Usage

1. **Development Server**

   Start the development server using Vite.

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

2. **Lint**

   Run ESLint to check for linting issues.

   ```bash
   npm run lint
   ```

3. **Prettier**

   Format the code using Prettier.

   ```bash
   npm run prettier
   ```
   
## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
