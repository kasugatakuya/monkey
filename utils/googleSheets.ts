import { google } from "googleapis";

// 各データタイプのインターフェース定義
interface BaseItem {
  _sheetType: string;
  _sheetId: string;
  [key: string]: string | number | boolean | undefined; // その他の任意のプロパティを許可（具体的な型を指定）
}

interface NewsItem extends BaseItem {
  _sheetType: "news";
  日付: string;
  タイトル: string;
  内容: string;
  リンクURL?: string;
  リンクテキスト?: string;
}

interface LiveItem extends BaseItem {
  _sheetType: "live";
  ライブ名: string;
  日時: string;
  場所: string;
  チケット代: string;
  販売状況: string;
  説明?: string;
}

interface MemberItem extends BaseItem {
  _sheetType: "member";
  名前: string;
  担当: string;
  説明?: string;
  使用機材?: string;
  好きなアーティスト?: string;
  好きな食べ物?: string;
  趣味?: string;
}

interface MusicItem extends BaseItem {
  _sheetType: "music";
  曲名: string;
  音源URL: string;
  説明?: string;
}

interface UnknownItem extends BaseItem {
  _sheetType: "unknown";
}

// すべてのデータタイプを結合
export type SheetItem =
  | NewsItem
  | LiveItem
  | MemberItem
  | MusicItem
  | UnknownItem;

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
export async function getSpreadsheetData(
  spreadsheetId: string,
  range: string = "シート1!A1:Z1000"
) {
  try {
    const sheets = await getGoogleSheetsClient();

    if (!spreadsheetId) {
      throw new Error("スプレッドシートIDが指定されていません");
    }

    // スプレッドシートのデータを取得
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    // データを返す
    return response.data.values || [];
  } catch (error) {
    console.error(
      `スプレッドシート(${spreadsheetId})データの取得に失敗しました:`,
      error
    );
    console.error("エラー詳細:", JSON.stringify(error, null, 2));
    throw error;
  }
}

// 特定のシートのすべてのデータを取得する関数
export async function getAllSheetData(
  spreadsheetId: string,
  sheetName: string = "シート1"
) {
  return getSpreadsheetData(spreadsheetId, `${sheetName}!A1:Z1000`);
}

// スプレッドシートの種類を判定する関数
function determineSheetType(
  headers: string[]
): "news" | "live" | "member" | "music" | "unknown" {
  // ニュース形式（日付、タイトル、内容などのヘッダーがある）
  if (
    headers.includes("日付") &&
    headers.includes("タイトル") &&
    headers.includes("内容")
  ) {
    return "news";
  }

  // ライブ情報形式（ライブ名、日時、場所などのヘッダーがある）
  if (
    headers.includes("ライブ名") &&
    headers.includes("日時") &&
    headers.includes("場所")
  ) {
    return "live";
  }

  // メンバー情報形式（名前、担当などのヘッダーがある）
  if (headers.includes("名前") && headers.includes("担当")) {
    return "member";
  }

  // 楽曲情報形式（曲名、音源URLなどのヘッダーがある）
  if (headers.includes("曲名") && headers.includes("音源URL")) {
    return "music";
  }

  // その他の形式
  return "unknown";
}

// 複数のスプレッドシートからデータを取得する関数
export async function getAllSpreadsheetsData(): Promise<SheetItem[]> {
  // 環境変数から全てのスプレッドシートIDを取得
  const spreadsheetIds = process.env.SPREADSHEET_IDS?.split(",") || [];

  // デフォルトのスプレッドシートIDも追加（後方互換性のため）
  const defaultSpreadsheetId = process.env.SPREADSHEET_ID;
  if (defaultSpreadsheetId && !spreadsheetIds.includes(defaultSpreadsheetId)) {
    spreadsheetIds.push(defaultSpreadsheetId);
  }

  if (spreadsheetIds.length === 0) {
    throw new Error("スプレッドシートIDが設定されていません");
  }

  // 全てのスプレッドシートからデータを取得
  const allDataPromises = spreadsheetIds.map(async (id) => {
    try {
      const rawData = await getAllSheetData(id);
      if (!rawData || rawData.length < 1) {
        return [];
      }

      // ヘッダーからシートの種類を判定
      const headers = rawData[0];
      const sheetType = determineSheetType(headers);

      // データをフォーマットして種類の情報を追加
      const formattedData = formatSheetData(rawData);

      // 型付きデータとして返す
      return formattedData.map((item) => ({
        ...item,
        _sheetType: sheetType,
        _sheetId: id,
      })) as SheetItem[];
    } catch (error) {
      console.error(`スプレッドシート(${id})の取得に失敗しました:`, error);
      return []; // エラーが発生しても処理を続行
    }
  });

  // 全てのデータを取得して結合
  const allData = await Promise.all(allDataPromises);
  return allData.flat(); // 配列を平坦化
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
