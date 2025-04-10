import { google } from "googleapis";

// Google Sheets APIのクライアントを初期化する関数
export async function getGoogleSheetsClient() {
  try {
    // 環境変数から認証情報を取得
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;

    if (!privateKey || !clientEmail) {
      throw new Error("Google API認証情報が設定されていません");
    }

    // JWTクライアントを作成
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    // Sheets APIのインスタンスを作成
    const sheets = google.sheets({ version: "v4", auth });
    return sheets;
  } catch (error) {
    console.error(
      "Google Sheets APIクライアントの初期化に失敗しました:",
      error
    );
    throw error;
  }
}

// スプレッドシートからデータを取得する関数
export async function getSpreadsheetData(range: string = "シート1!A1:Z1000") {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId = process.env.SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error("スプレッドシートIDが設定されていません");
    }

    // スプレッドシートのデータを取得
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    // データを返す
    return response.data.values || [];
  } catch (error) {
    console.error("スプレッドシートデータの取得に失敗しました:", error);
    console.error("エラー詳細:", JSON.stringify(error, null, 2));
    throw error;
  }
}

// 特定のシートのすべてのデータを取得する関数
export async function getAllSheetData(sheetName: string = "シート1") {
  return getSpreadsheetData(`${sheetName}!A1:Z1000`);
}

// ヘッダーと行データを整形してオブジェクトの配列に変換する関数
export function formatSheetData(data: string[][]) {
  if (!data || data.length < 2) {
    return [];
  }

  // 最初の行をヘッダーとして使用
  const headers = data[0];

  // 残りの行をデータとして扱う
  const rows = data.slice(1);

  // 各行をオブジェクトに変換
  return rows.map((row) => {
    const item: Record<string, string> = {};
    headers.forEach((header, index) => {
      item[header] = row[index] || "";
    });
    return item;
  });
}
