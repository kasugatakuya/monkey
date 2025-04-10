import { NextResponse } from "next/server";
import { getAllSheetData, formatSheetData } from "@/utils/googleSheets";

// Google Sheetsからデータを取得するAPIルート
export async function GET() {
  try {
    // シートからデータを取得
    const sheetData = await getAllSheetData();

    // データを整形
    const formattedData = formatSheetData(sheetData);

    // 正常なレスポンスを返す
    return NextResponse.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("APIエラー:", error);

    // エラーレスポンスを返す
    return NextResponse.json(
      { success: false, error: "スプレッドシートデータの取得に失敗しました" },
      { status: 500 }
    );
  }
}
