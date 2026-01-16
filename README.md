# 🎯 Soc Ops

### Break the ice, make connections, have fun! 🎉

**Soc Ops** is an interactive social bingo game designed to transform awkward mixers into engaging experiences. Players race to find people who match the prompts on their bingo board—first to get 5 in a row wins!

Perfect for conferences, team events, workshops, or any gathering where you want people to actually talk to each other.

---

## ✨ Features

- 🎲 **Randomized boards** - Every player gets a unique 5×5 grid
- 📱 **Mobile-first design** - Works seamlessly on phones and tablets
- 🎨 **Modern UI** - Built with React 19 and Tailwind CSS v4
- ⚡ **Lightning fast** - Powered by Vite for instant updates
- 🚀 **Zero backend** - Pure frontend, deploy anywhere
- ♿ **Accessible** - Keyboard navigation and screen reader support

---

## 🎮 How to Play

1. **Start the game** - Each player opens the app and taps "Start Game"
2. **Mingle** - Find people who match the prompts on your board
3. **Mark squares** - Tap a square when you find a match
4. **Get 5 in a row** - Horizontal, vertical, or diagonal wins!
5. **Celebrate** - First to yell "BINGO!" wins! 🏆

> 💡 **Pro tip:** The center square is always a FREE SPACE to get you started!

---

## 🚀 Quick Start

### Prerequisites

- [Node.js 22](https://nodejs.org/) or higher

### Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173` 🎉

### Build for Production

```bash
npm run build
```

Optimized files will be in the `dist/` directory.

---

## 🎨 Customize Your Game

### Add Your Own Questions

Edit `src/data/questions.ts` to customize the prompts:

```typescript
export const questions: string[] = [
  "bikes to work",
  "has lived in another country",
  "speaks more than 2 languages",
  // Add your own questions here!
];
```

You need at least 24 unique questions (the 25th square is always "FREE SPACE").

### Styling & Theme

This project uses **Tailwind CSS v4** with theme configuration in `src/index.css`. Modify colors, fonts, and spacing using the `@theme` directive.

---

## 🛠️ Tech Stack

- **React 19** - Latest React features and performance
- **TypeScript** - Type-safe code
- **Vite 7** - Next-generation build tool
- **Tailwind CSS v4** - Modern utility-first CSS
- **Vitest** - Fast unit testing

---

## 📦 Deployment

### GitHub Pages

Deploys automatically to GitHub Pages on push to `main` branch.

**Setup:**
1. Enable **Settings** → **Pages** → **Source**: GitHub Actions
2. Push to `main` branch
3. Access at: `https://{username}.github.io/{repo-name}`

### Other Platforms

Deploy the `dist/` folder to any static hosting service:
- Vercel
- Netlify
- Cloudflare Pages
- Firebase Hosting

---

## 🧪 Development

### Run Tests

```bash
npm run test
```

### Lint Code

```bash
npm run lint
```

---

## 🎓 Learning Resource

This project is part of the **VS Code Agent Lab** workshop, demonstrating:
- AI-guided development workflows
- Context engineering for better AI assistance
- Custom agents and specialized workflows
- Modern React and TypeScript patterns

👉 **[Follow the Lab Guide](.lab/GUIDE.md)** for the complete workshop experience.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests
- 📝 Improve documentation

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🌟 Show Your Support

If you found this project helpful:
- ⭐ Star this repository
- 🐦 Share it with your network
- 🎯 Use it at your next event!

---

**Made with ❤️ for better human connections**
