import { NextResponse } from "next/server";
import { getAllSpreadsheetsData } from "@/utils/googleSheets";
import { cache } from "@/utils/cache";

// キャッシュを使用するため、force-dynamicを削除
export const revalidate = 60; // 60秒ごとに再検証

// Google Sheetsからデータを取得するAPIルート（キャッシュ対応）
export async function GET() {
  try {
    const cacheKey = "sheets-data";

    // キャッシュからデータを取得
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("キャッシュからデータを返却");
      return NextResponse.json(
        {
          success: true,
          data: cachedData,
          timestamp: new Date().toISOString(),
          cached: true,
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    // リクエストのタイムスタンプをログに記録（デバッグ用）
    const startTime = Date.now();
    console.log("Sheetsデータ取得リクエスト開始:", new Date().toISOString());

    // 全てのスプレッドシートからデータを取得
    const formattedData = await getAllSpreadsheetsData();

    // キャッシュに保存（60秒間）
    cache.set(cacheKey, formattedData, 60000);

    const elapsed = Date.now() - startTime;
    console.log(`データ取得完了: ${elapsed}ms`);

    // 正常なレスポンスを返す
    return NextResponse.json(
      {
        success: true,
        data: formattedData,
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("APIエラー:", error);

    // エラーレスポンスを返す
    return NextResponse.json(
      { success: false, error: "スプレッドシートデータの取得に失敗しました" },
      {
        status: 500,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  }
}
