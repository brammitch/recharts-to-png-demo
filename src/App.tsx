import FileSaver from "file-saver";
import { useCallback, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCurrentPng, useGenerateImage } from "recharts-to-png";

import "./App.css";
import { getLgData, getLgPieData, getSmPieData } from "./data.ts";

function App(): JSX.Element {
  // Implement useGenerateImage to get an image of any element (not just a Recharts component)
  const [getDivJpeg, { ref: divRef }] = useGenerateImage<HTMLDivElement>({
    quality: 0.8,
    type: "image/jpeg",
  });
  const handleDivDownload = useCallback(async () => {
    const jpeg = await getDivJpeg();
    if (jpeg) {
      FileSaver.saveAs(jpeg, "div-element.jpeg");
    }
  }, [getDivJpeg]);

  // Area chart setup
  const [areaData] = useState(getLgData(100));
  const [getAreaPng, { ref: areaRef }] = useCurrentPng();
  const handleAreaDownload = useCallback(async () => {
    const png = await getAreaPng();
    if (png) {
      FileSaver.saveAs(png, "area-chart.png");
    }
  }, [getAreaPng]);

  // Pie chart setup
  const [data01] = useState(getSmPieData());
  const [data02] = useState(getLgPieData());
  const [getPiePng, { ref: pieRef }] = useCurrentPng();
  const handlePieDownload = useCallback(async () => {
    const png = await getPiePng();
    if (png) {
      FileSaver.saveAs(png, "pie-chart.png");
    }
  }, [getPiePng]);

  // Composed chart setup
  const [composedData] = useState(getLgData(500));
  const [getComposedPng, { ref: composedRef, isLoading }] = useCurrentPng();
  const handleComposedDownload = useCallback(async () => {
    const png = await getComposedPng();
    if (png) {
      FileSaver.saveAs(png, "composed-chart.png");
    }
  }, [getComposedPng]);

  return (
    <div className="grid-container" ref={divRef}>
      <div className="area-chart">
        <h4>
          <code>Example: useCurrentPng for Responsive Area Chart</code>
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={areaData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            ref={areaRef}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <br />
        <button onClick={handleAreaDownload}>
          <code>Download Area Chart</code>
        </button>
      </div>
      <div className="pie-chart">
        <h4>
          <code>Example: useCurrentPng for Responsive Pie Chart</code>
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart ref={pieRef}>
            <Pie
              data={data01}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            />
            <Pie
              data={data02}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ResponsiveContainer>
        <br />
        <button onClick={handlePieDownload}>
          <code>Download Pie Chart</code>
        </button>
      </div>
      <div className="composed-chart">
        <h4>
          <code>
            Example: useCurrentPng for Responsive Composed Chart, with isLoading
            for button state change
          </code>
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={composedData} ref={composedRef}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Area
              type="monotone"
              dataKey="amt"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
          </ComposedChart>
        </ResponsiveContainer>
        <br />
        <button disabled={isLoading} onClick={handleComposedDownload}>
          {isLoading ? (
            <span className="download-button-content">
              <i className="gg-spinner" />
              <span className="download-button-text">
                <code>Downloading...</code>
              </span>
            </span>
          ) : (
            <span className="download-button-content">
              <i className="gg-software-download" />
              <span className="download-button-text">
                <code>Download Composed Chart</code>
              </span>
            </span>
          )}
        </button>
      </div>
      <div className="download-all">
        <button onClick={handleDivDownload}>
          <code>{"Download <div> Element"}</code>
        </button>
      </div>
    </div>
  );
}

export default App;
