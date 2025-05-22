/**
 * API の共通レスポンス形式を表すジェネリックインターフェース
 *
 * @template DataType - 成功時に返されるデータの型（省略時は null）
 * @template ErrorDetailsType - エラー時の追加情報の型（省略時は unknown）
 */
export interface ApiResponse<DataType = null, ErrorDetailsType = unknown> {
  /** 操作が成功したかどうかを示すフラグ */
  success: boolean;

  /** HTTP ステータスコード（例: 200, 404, 500 など） */
  status?: number;

  /** 成功時のレスポンスデータ（成功時のみ存在） */
  data?: DataType;

  /** エラー情報（失敗時のみ存在） */
  error?: {
    /** エラーの概要メッセージ */
    message: string;

    /** エラーコード（任意の文字列または数値） */
    code?: string | number;

    /** エラーの詳細情報（構造化された任意のオブジェクト） */
    details?: ErrorDetailsType;
  };
}
