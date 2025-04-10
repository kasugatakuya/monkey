"use client";

import { useState, useEffect } from "react";

type SheetData = Record<string, string>[];

export default function SheetDataTable() {
  const [data, setData] = useState<SheetData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/sheets");
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || "データの取得に失敗しました");
        }

        setData(result.data);
        setError(null);
      } catch (err) {
        console.error("データ取得エラー:", err);
        setError("スプレッドシートのデータを取得できませんでした");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-4 rounded-md">
        <p className="text-red-700 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 p-4 rounded-md">
        <p className="text-yellow-700 dark:text-yellow-400">
          データが存在しません。スプレッドシートにデータが入力されているか確認してください。
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            {Object.keys(data[0]).map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2 border-b border-r border-gray-200 dark:border-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
