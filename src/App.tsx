import { useState, useEffect } from 'react';

// Simulated real-time price with fluctuations
const useOilPrice = () => {
  const [price, setPrice] = useState(0.00042069);
  const [change24h, setChange24h] = useState(12.5);
  const [marketCap, setMarketCap] = useState(420690);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prev => {
        const change = (Math.random() - 0.48) * 0.00001;
        return Math.max(0.00001, prev + change);
      });
      setChange24h(prev => prev + (Math.random() - 0.5) * 0.5);
      setMarketCap(prev => prev + Math.floor((Math.random() - 0.5) * 1000));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return { price, change24h, marketCap };
};

// Mock news data
const mockNews = [
  { id: 1, source: 'Breaking', title: 'Oil prices surge amid Middle East tensions', time: '2m ago', urgent: true },
  { id: 2, source: 'Reuters', title: 'OPEC+ maintains production cuts through Q2', time: '15m ago', urgent: false },
  { id: 3, source: 'Bloomberg', title: 'US Strategic Petroleum Reserve at historic lows', time: '32m ago', urgent: true },
  { id: 4, source: 'WSJ', title: 'Russia oil exports face new sanctions pressure', time: '1h ago', urgent: false },
  { id: 5, source: 'AP', title: 'Red Sea shipping disruptions escalate', time: '2h ago', urgent: true },
  { id: 6, source: 'FT', title: 'Natural gas prices spike on supply concerns', time: '3h ago', urgent: false },
  { id: 7, source: 'CNN', title: 'Ukraine conflict impacts energy markets', time: '4h ago', urgent: true },
  { id: 8, source: 'BBC', title: 'Global oil demand forecast revised upward', time: '5h ago', urgent: false },
];

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const OilDropIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M12 2c-5.33 8-8 12.42-8 16a8 8 0 1 0 16 0c0-3.58-2.67-8-8-16zm0 20a6 6 0 0 1-6-6c0-2.53 1.73-5.74 6-12.32 4.27 6.58 6 9.79 6 12.32a6 6 0 0 1-6 6z"/>
    <circle cx="12" cy="16" r="3"/>
  </svg>
);

const RadarSweep = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
      <div className="absolute inset-0 rounded-full border border-base-blue/30" />
      <div className="absolute inset-[25%] rounded-full border border-base-blue/20" />
      <div className="absolute inset-[50%] rounded-full border border-base-blue/10" />
      <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left animate-radar-sweep">
        <div className="w-full h-full bg-gradient-to-r from-base-blue to-transparent" />
      </div>
    </div>
  </div>
);

const Scanlines = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,82,255,0.1) 2px, rgba(0,82,255,0.1) 4px)'
    }}
  />
);

function App() {
  const { price, change24h, marketCap } = useOilPrice();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copiedCA, setCopiedCA] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const contractAddress = '0x21FD44bE608F1D18689CDcC8861AE74571Ae8888';
  const buyLink = 'https://base.meme/coin/base:0x21FD44bE608F1D18689CDcC8861AE74571Ae8888?referrer=0xFCE86e6A615B40A620b1a666ff4B866Cd273c476';
  const xLink = 'https://x.com/Basecrude';

  const copyCA = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedCA(true);
    setTimeout(() => setCopiedCA(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-body relative overflow-x-hidden">
      <Scanlines />
      <RadarSweep />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-base-blue/10 blur-[150px] pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-10 border-b border-base-blue/20 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <OilDropIcon className="w-8 h-8 sm:w-10 sm:h-10 text-base-blue animate-pulse-glow" />
                <div className="absolute inset-0 bg-base-blue/30 blur-xl" />
              </div>
              <div>
                <h1 className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white">
                  BASE<span className="text-base-blue">CRUDE</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 font-mono tracking-widest">COMMAND CENTER</p>
              </div>
            </div>

            {/* CA Display */}
            <div
              onClick={copyCA}
              className="flex items-center gap-2 bg-[#111118] border border-base-blue/30 rounded px-2 sm:px-3 py-2 cursor-pointer hover:border-base-blue/60 transition-all group"
            >
              <span className="text-[10px] sm:text-xs text-base-blue font-mono font-bold">$OIL CA:</span>
              <span className="text-[9px] sm:text-xs font-mono text-gray-300 group-hover:text-white transition-colors truncate max-w-[120px] sm:max-w-none">
                {contractAddress}
              </span>
              <span className="text-[10px] text-base-blue ml-1 hidden sm:inline">{copiedCA ? 'COPIED!' : 'COPY'}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={xLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#111118] border border-gray-700 rounded hover:border-white transition-all group min-h-[44px]"
              >
                <XIcon />
                <span className="text-xs font-mono hidden sm:inline">@Basecrude</span>
              </a>
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-base-blue text-white font-bold rounded hover:bg-base-blue-light transition-all animate-pulse-glow min-h-[44px]"
              >
                <OilDropIcon className="w-4 h-4" />
                <span className="text-sm font-display tracking-wide">BUY $OIL</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6 px-2 sm:px-4 py-2 bg-[#111118]/50 border border-base-blue/10 rounded">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono text-gray-400">SYSTEMS ONLINE</span>
          </div>
          <div className="text-[10px] sm:text-xs font-mono text-gray-500">
            {currentTime.toUTCString()}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-mono text-gray-400">BASE CHAIN</span>
            <div className="w-2 h-2 rounded-full bg-base-blue animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Price Panel - Takes 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Main Price Display */}
            <div className="relative bg-[#111118] border border-base-blue/20 rounded-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-base-blue to-transparent" />

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 sm:mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <OilDropIcon className="w-10 h-10 sm:w-12 sm:h-12 text-base-blue" />
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold">$OIL</h2>
                        <p className="text-xs sm:text-sm text-gray-500">World Oil Token</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-green-400">LIVE</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 sm:mb-8">
                  <p className="text-xs sm:text-sm text-gray-500 font-mono mb-1">CURRENT PRICE (USD)</p>
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tabular-nums">
                      ${price.toFixed(8)}
                    </span>
                    <span className={`text-lg sm:text-xl font-mono ${change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {change24h >= 0 ? '+' : ''}{change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-[#0a0a0f] p-3 sm:p-4 rounded border border-gray-800">
                    <p className="text-[10px] sm:text-xs text-gray-500 font-mono mb-1">MARKET CAP</p>
                    <p className="text-lg sm:text-xl font-bold text-white tabular-nums">${marketCap.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#0a0a0f] p-3 sm:p-4 rounded border border-gray-800">
                    <p className="text-[10px] sm:text-xs text-gray-500 font-mono mb-1">24H VOLUME</p>
                    <p className="text-lg sm:text-xl font-bold text-white tabular-nums">$69,420</p>
                  </div>
                  <div className="bg-[#0a0a0f] p-3 sm:p-4 rounded border border-gray-800 col-span-2 sm:col-span-1">
                    <p className="text-[10px] sm:text-xs text-gray-500 font-mono mb-1">HOLDERS</p>
                    <p className="text-lg sm:text-xl font-bold text-white tabular-nums">1,337</p>
                  </div>
                </div>
              </div>

              {/* Animated price line */}
              <div className="h-24 sm:h-32 px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="w-full h-full bg-[#0a0a0f] rounded border border-gray-800 overflow-hidden relative">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0052FF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0052FF" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q50,60 100,70 T200,50 T300,65 T400,45 T500,55 T600,35 T700,40 T800,25"
                      stroke="#0052FF"
                      strokeWidth="2"
                      fill="none"
                      className="animate-price-line"
                    />
                    <path
                      d="M0,80 Q50,60 100,70 T200,50 T300,65 T400,45 T500,55 T600,35 T700,40 T800,25 V100 H0 Z"
                      fill="url(#priceGradient)"
                      className="animate-price-line"
                    />
                  </svg>
                  <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-600">24H CHART</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3 p-4 sm:p-6 bg-base-blue/10 border-2 border-base-blue rounded-lg hover:bg-base-blue/20 transition-all group min-h-[80px]"
              >
                <OilDropIcon className="w-6 h-6 sm:w-8 sm:h-8 text-base-blue group-hover:scale-110 transition-transform" />
                <span className="font-display text-lg sm:text-xl font-bold text-base-blue">BUY $OIL</span>
              </a>
              <a
                href={xLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 sm:gap-3 p-4 sm:p-6 bg-[#111118] border border-gray-700 rounded-lg hover:border-white transition-all group min-h-[80px]"
              >
                <XIcon />
                <span className="font-display text-lg sm:text-xl font-bold text-white">FOLLOW</span>
              </a>
            </div>
          </div>

          {/* News Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#111118] border border-red-500/20 rounded-lg overflow-hidden h-full">
              <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <h3 className="font-display text-sm font-bold text-red-400 tracking-wider">LIVE INTEL</h3>
                </div>
                <span className="text-[10px] font-mono text-red-400/60">OIL &amp; WAR NEWS</span>
              </div>

              <div className="divide-y divide-gray-800/50 max-h-[400px] sm:max-h-[500px] lg:max-h-none overflow-y-auto">
                {mockNews.map((news, index) => (
                  <div
                    key={news.id}
                    className="p-3 sm:p-4 hover:bg-[#0a0a0f] transition-colors cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      {news.urgent && (
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mt-2 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-mono font-bold ${news.urgent ? 'text-red-400' : 'text-gray-500'}`}>
                            {news.source.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-mono text-gray-600">{news.time}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                          {news.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* News ticker */}
              <div className="border-t border-red-500/20 bg-red-500/5 px-4 py-2 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-red-400 flex-shrink-0">ALERT:</span>
                  <div className="overflow-hidden">
                    <p className="text-[10px] font-mono text-gray-400 whitespace-nowrap animate-ticker">
                      Global oil markets volatile amid geopolitical tensions | $OIL pumping on BASE | OPEC meeting scheduled | Crude futures up 3.2%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-[#111118] border border-gray-800 rounded p-3 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-base-blue/10 flex items-center justify-center flex-shrink-0">
              <span className="text-base-blue text-lg">B</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-mono">NETWORK</p>
              <p className="text-sm font-bold">Base Chain</p>
            </div>
          </div>
          <div className="bg-[#111118] border border-gray-800 rounded p-3 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-mono">STATUS</p>
              <p className="text-sm font-bold text-green-400">All Systems Go</p>
            </div>
          </div>
          <div className="bg-[#111118] border border-gray-800 rounded p-3 sm:p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
              <span className="text-yellow-500 text-lg">!</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-mono">ALERT LEVEL</p>
              <p className="text-sm font-bold text-yellow-400">ELEVATED</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 sm:mt-12 border-t border-gray-800/50 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <p className="text-center text-[10px] sm:text-xs text-gray-600 font-mono">
            Requested by{' '}
            <a href={xLink} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-base-blue transition-colors">
              @BASECRUDE
            </a>
            {' '}&middot;{' '}Built by{' '}
            <a href="https://x.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-base-blue transition-colors">
              @clonkbot
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
