# React Text Highlighter Component

## Overview

This project showcases a React component that allows users to select and highlight text using their mouse pointer. The
component supports both plain text and rich text formats. The project is built using modern web technologies including
React, TailwindCSS, Vite, TypeScript, ESLint, and Prettier.

[Live Preview](https://carte-blanche-innovation-integrated.github.io/text-highlighter/)

## Features

- Highlight text in both plain text and rich text formats.
- Display selected text with custom annotations.
- Efficiently manage text selections and their respective annotations.

## Technologies Used

- **React**: For building the user interface.
- **TailwindCSS**: For styling the application.
- **Vite**: For fast and optimized development.
- **TypeScript**: For type-safe JavaScript development.
- **ESLint**: For linting and ensuring code quality.
- **Prettier**: For code formatting.

## Project Structure

The project is structured as follows:

```
├── src
│   ├── components
│   │   └── TextHighlighter.tsx
│   ├── core
│   │   ├── Documents.ts
│   │   └── MarkerNode.ts
│   └── App.tsx
├── package.json
└── vite.config.ts
```

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

5. **Prettier**

   Format the code using Prettier.

   ```bash
   npm run prettier
   ```

## Code Explanation

### [`MarkerNode.tsx`](https://github.com/Carte-Blanche-Innovation-Integrated/text-highlighter/blob/main/src/core/MarkerNode.ts)

The `MarkerNode` class is used to manage text selection and annotations. It contains methods to add, remove, and
manipulate child nodes that represent highlighted text segments.


### [`Documents.tsx`](https://github.com/Carte-Blanche-Innovation-Integrated/text-highlighter/blob/main/src/core/Documents.ts)

The `Documents.ts` file contains abstract and concrete classes to represent plain text and HTML documents.


### [`TextHighlighter.tsx`](https://github.com/Carte-Blanche-Innovation-Integrated/text-highlighter/blob/main/src/components/TextHighlighter.tsx)

The `TextHighlighter` component is the core UI component that allows users to select and highlight text. It manages
user interactions and updates the document tree with selected text ranges.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.