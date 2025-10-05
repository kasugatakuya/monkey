import { NextResponse } from "next/server";
import { getAllSpreadsheetsData } from "@/utils/googleSheets";

// キャッシュを無効化し、毎回のリクエストで再検証
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Google Sheetsからデータを取得するAPIルート（タイムアウト対策済み）
export async function GET() {
  try {
    // リクエストのタイムスタンプをログに記録（デバッグ用）
    const startTime = Date.now();
    console.log("Sheetsデータ取得リクエスト開始:", new Date().toISOString());

    // 全てのスプレッドシートからデータを取得（タイムアウトチェック付き）
    const formattedData = await getAllSpreadsheetsData();

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
          "Cache-Control": "no-store, max-age=0",
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
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
