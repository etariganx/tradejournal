import React, { useState } from "react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Input } from "@/components/ui/input"; import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; import { motion } from "framer-motion";

export default function DailyUpdateTradingJournal() { const [search, setSearch] = useState(""); const [selectedCoin, setSelectedCoin] = useState(null); const [timeframe, setTimeframe] = useState("15M"); const [categories, setCategories] = useState([]); const [analysis, setAnalysis] = useState(null);

const handleSearch = () => { if (!search) return; setSelectedCoin(search.toUpperCase()); if (!categories.includes(search.toUpperCase())) { setCategories([...categories, search.toUpperCase()]); } };

const handleUpdate = () => {
  const now = new Date();

  const formatted = `${selectedCoin}-${now
    .toLocaleDateString("en-GB")
    .replace(/\//g, "-")}-${now
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(":", "-")}`;

  setAnalysis({
    title: formatted,
    technical: "Auto technical analysis generated based on indicators configuration.",
    fundamental: "Latest macro & on-chain sentiment placeholder.",
    conclusion: "Potential bullish continuation. Entry near support.",
    entry: "Entry: Market / Pullback",
    sl: "Stop Loss: -2%",
    tp: "Take Profit: +4%",
  });
};

return ( <div className="min-h-screen flex flex-col bg-gray-50"> {/* Navbar */} <div className="w-full text-center py-6"> <h1 className="text-3xl font-bold">Daily Update Trading Journal</h1> <div className="flex justify-center gap-10 mt-4"> <span className="cursor-pointer">Home</span> <Select onValueChange={(val) => setSelectedCoin(val)}> <SelectTrigger className="w-40"> <SelectValue placeholder="Coin" /> </SelectTrigger> <SelectContent> {categories.map((coin) => ( <SelectItem key={coin} value={coin}> {coin} </SelectItem> ))} </SelectContent> </Select> <span className="cursor-pointer">About</span> </div> <div className="border-b-2 border-black mt-6 w-full"></div> </div>

{/* Search */}
  <div className="flex flex-col items-center mt-10">
    <div className="flex gap-4">
      <Input
        placeholder="Search Coin / Token (e.g. ETH)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-72"
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  </div>

  {/* Chart Section */}
  {selectedCoin && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 px-10"
    >
      <Card className="rounded-2xl shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {selectedCoin} Chart (Default 15M)
            </h2>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5M">5M</SelectItem>
                <SelectItem value="15M">15M</SelectItem>
                <SelectItem value="1H">1H</SelectItem>
                <SelectItem value="4H">4H</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-gray-200 h-96 flex items-center justify-center rounded-xl">
            Candlestick Chart Placeholder with Indicators Configured
            (SRL 1,1 | MA 5/10/30 | EMA 5/10/30 | BOLL N20 P2 |
            SAR 0.02/0.02/0.2 | VOL 5/10 | MACD 12/26/9 | KDJ 9 |
            RSI multi | WR multi | OBV 30 | StochRSI 14/14/3/3)
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-6">
        <Button onClick={handleUpdate}>Update Info 1 Jam Kedepan</Button>
      </div>
    </motion.div>
  )}

  {/* Analysis */}
  {analysis && (
    <div className="mt-10 px-10">
      <Card className="rounded-2xl shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h3 className="text-lg font-bold">{analysis.title}</h3>
          <p><strong>Technical:</strong> {analysis.technical}</p>
          <p><strong>Fundamental:</strong> {analysis.fundamental}</p>
          <p><strong>Conclusion:</strong> {analysis.conclusion}</p>
          <p>{analysis.entry}</p>
          <p>{analysis.sl}</p>
          <p>{analysis.tp}</p>
          <div className="flex justify-end">
            <Button>Publish</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )}

  {/* Footer */}
  <footer className="mt-auto bg-black text-white text-center py-6 mt-16">
    <p>© {new Date().getFullYear()} enchone</p>
    <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="underline">
      Visit Website
    </a>
  </footer>
</div>

); }
