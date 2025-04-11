import { NextResponse } from "next/server";
import { getAllSpreadsheetsData } from "@/utils/googleSheets";

// キャッシュを無効化し、毎回のリクエストで再検証
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Google Sheetsからデータを取得するAPIルート
export async function GET() {
  try {
    // リクエストのタイムスタンプをログに記録（デバッグ用）
    console.log("Sheetsデータ取得リクエスト:", new Date().toISOString());

    // 全てのスプレッドシートからデータを取得
    const formattedData = await getAllSpreadsheetsData();

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
