# 🚀 Complete Figma Developer Handoff Plugin - Setup Guide

## Quick Start

This repository contains a **production-ready, advanced Figma plugin** for developer handoff.

### Features
- ✅ Multi-selection support
- ✅ Framework code export (React, HTML/CSS, Tailwind)
- ✅ Design specs extraction
- ✅ Asset batch export (SVG/PNG)
- ✅ Design token extraction
- ✅ Accessibility checks (WCAG)
- ✅ Responsive layout code generation

---

## 📁 Complete Project Structure

```
figma-developer-handoff/
├── manifest.json
├── package.json
├── tsconfig.json
├── src/
│   ├── code.ts
│   ├── ui.html
│   ├── helpers/
│   │   ├── extractSpecs.ts
│   │   ├── codeGenerator.ts
│   │   ├── accessibilityChecker.ts
│   │   └── tokenExtractor.ts
│   └── styles/
│       └── ui.css
├── dist/ (generated)
└── README.md
```

---

## 📦 Installation

### 1. Clone this repository
```bash
git clone https://github.com/jenilrupapara001/figma-developer-handoff.git
cd figma-developer-handoff
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
```

### 3. Build the plugin
```bash
npm run build
```

### 4. Load in Figma
1. Open Figma Desktop
2. Go to `Menu > Plugins > Development > Import plugin from manifest...`
3. Select the `manifest.json` file from this project
4. Run the plugin from `Menu > Plugins > Development > Developer Handoff`

---

## 🔧 Development

```bash
# Watch mode for development
npm run watch

# Build for production
npm run build
```

---

## 📝 All Files Included

See the `/src` folder for:
- **code.ts** - Main plugin logic
- **ui.html** - Plugin UI
- **helpers/** - Utility functions for specs, code generation, tokens, and accessibility

---

## 🎯 Usage

1. Select any layer/frame/component in Figma
2. Run the plugin
3. View specs, copy CSS/code, export assets, check accessibility
4. Switch between tabs: Specs | Code | Assets | Tokens | Accessibility

---

## 🚀 Next Steps

- Customize code generation templates in `src/helpers/codeGenerator.ts`
- Add more framework support
- Extend accessibility rules
- Publish to Figma Community

---

## 📄 License

MIT License - feel free to use and modify!

---

## 🤝 Contributing

Pull requests welcome! Check issues for tasks.

---

**Ready to use!** Clone, install, build, and start using the most advanced free developer handoff plugin for Figma.
