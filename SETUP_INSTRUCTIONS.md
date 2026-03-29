# CryptoPay Merchant Dashboard

A production-ready, dynamic merchant dashboard UI for monitoring USDT-to-USD crypto transactions. Built with React 18, TypeScript, Vite, Tailwind CSS, and modern fintech design principles.

## 🎯 Features

- **Real-time Dashboard** - Monitor USDT transactions and USD payouts with live metrics
- **Transaction Management** - Sortable, searchable table with pagination and filtering
- **Advanced Analytics** - Interactive charts showing revenue trends, network distribution, and settlements
- **Responsive Design** - Fully responsive from mobile to desktop with adaptive layouts
- **State Management** - Zustand store for efficient state handling
- **Mock Data** - Realistic transaction data for development and testing
- **Access Controls** - API keys management and webhook configuration
- **Settings Panel** - Merchant profile, wallet, bank account, and notification preferences
- **Export Functionality** - Generate and export reports as CSV
- **Fintech UI Components** - Clean, modern design with soft shadows and subtle gradients

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **React Router** - Navigation
- **Zustand** - State management
- **ESLint** - Code quality

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cryptopay-dashboard.git
cd cryptopay-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 4. Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Top navigation bar
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── Footer.tsx       # Footer
│   │   └── Avatar.tsx       # User avatar component
│   ├── dashboard/
│   │   ├── SummaryCards.tsx        # Key metrics cards
│   │   ├── TransactionTable.tsx    # Transaction list
│   │   ├── FilterBar.tsx           # Advanced filters
│   │   ├── ConversionCard.tsx      # Exchange rate
│   │   └── PayoutStatusCard.tsx    # Payout overview
│   ├── charts/
│   │   ├── RevenueChart.tsx            # Revenue trends
│   │   ├── NetworkDistributionChart.tsx # Network pie chart
│   │   └── SettlementsChart.tsx        # Monthly settlements
│   └── ui/
│       ├── Button.tsx       # Reusable button
│       ├── Card.tsx         # Card container
│       ├── Badge.tsx        # Status badge
│       ├── Table.tsx        # Table component
│       ├── Input.tsx        # Input field
│       ├── Select.tsx       # Select field
│       └── Skeleton.tsx     # Loading skeleton
├── pages/
│   ├── Dashboard.tsx  # Main dashboard page
│   ├── Reports.tsx    # Reports & analytics
│   └── Settings.tsx   # Settings & configuration
├── store/
│   └── index.ts       # Zustand state store
├── hooks/
│   └── index.ts       # Custom React hooks
├── types/
│   └── index.ts       # TypeScript interfaces
├── utils/
│   ├── index.ts       # Utility functions
│   └── cn.ts          # Tailwind classname utility
├── data/
│   └── mockData.ts    # Mock transaction data
├── App.tsx            # Main app component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 🎨 UI Components

### Available Components

- **SummaryCards** - Display key metrics with icons and trends
- **TransactionTable** - Searchable, sortable, paginated transaction list
- **FilterBar** - Advanced filtering by status, network, date, and amount
- **ConversionCard** - Display current exchange rate
- **PayoutStatusCard** - Show payout metrics and status
- **RevenueChart** - Line chart for daily revenue trends
- **NetworkDistributionChart** - Pie chart for network breakdown
- **SettlementsChart** - Bar chart for monthly settlements

## 📊 Mock Data

Mock data is stored in `src/data/mockData.ts` and includes:

- **50+ Sample Transactions** - With realistic data (amounts, statuses, networks)
- **Daily Revenue Data** - 7 days of revenue trends
- **Network Distribution** - ERC20, TRC20, BEP20 breakdown
- **Monthly Summary** - 6 months of settlement data
- **Notifications** - Sample notification items
- **API Keys** - Mock API key management data

## 🔧 Configuration

### Tailwind CSS

Customize colors and theme in `tailwind.config.ts`

### Vite

Config in `vite.config.ts` - includes path aliasing for `@/`

### TypeScript

Config in `tsconfig.json` with strict mode enabled

## 🧠 State Management (Zustand)

The app uses Zustand for state management. Key stores:

```typescript
// Access store directly
const store = useAppStore();

// Available actions
store.filterTransactions(filters);
store.toggleSidebar();
store.toggleDarkMode();
store.markNotificationAsRead(id);
store.setProfile(profile);
```

## 🎯 Key Features

### 1. Dashboard
- Summary metrics cards
- Interactive charts
- Transaction table with search & sort
- Advanced filtering
- Export to CSV

### 2. Reports
- Generate reports with date range
- Monthly breakdown table
- Key metrics summary
- Export in multiple formats

### 3. Settings
- Merchant profile management
- Wallet address configuration
- Bank account details
- API key management
- Webhook configuration
- Notification preferences
- Dark mode toggle

## 📱 Responsive Breakpoints

- **Mobile** - `max-width: 640px`
- **Tablet** - `640px to 1024px`
- **Desktop** - `1024px+`

## 🎨 Design System

### Colors
- **Primary**: Indigo (#4f46e5)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Background**: Light Gray (#f8fafc)

### Typography
- **Font**: System fonts (Tailwind default)
- **Headings**: Bold, sans-serif
- **Body**: Regular, readable size

### Shadows & Borders
- **Rounded Corners**: `rounded-2xl` for cards, `rounded-lg` for buttons
- **Shadows**: Soft shadows with hover effects
- **Borders**: Subtle 1px slate-200

## 🔒 Security Notes

- API keys are mocked in this demo version
- In production, use environment variables for secrets
- Implement proper authentication
- Add CSRF protection
- Use HTTPS for all API calls

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop the dist folder to Netlify
```

## 📝 Environment Variables

Create a `.env` file for configuration:

```env
VITE_API_BASE_URL=https://api.example.com
VITE_MERCHANT_ID=merchant_001
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Clear Cache
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
- Ensure TypeScript errors are resolved
- Check that all imports are correct
- Verify Node version compatibility

## 📚 Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)
- [Recharts](https://recharts.org)
- [Zustand](https://zustand-demo.vercel.app)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ for merchants using crypto payment gateways.

---

**Note**: This is a frontend-only dashboard with mock data. To integrate with a real backend API, update the data fetching logic in the store and components.
