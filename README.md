# GENBI342プロジェクト — GENBI(仮称) Phase 1 BETA

厳美渓(岩手県一関市厳美町)を起点に、国道342号を通って須川温泉・須川岳方面までを案内する観光サイトです。個人・匿名・非営利運営。広告・支援金なし。GitHub Pagesで静的配信します。

**コンセプト:** 厳美渓を、目的地から旅の入口へ。

## ディレクトリ構成

```
/
├─ index.html          TOPページ
├─ style.css
├─ script.js
├─ data/
│  ├─ spots.js         スポットデータ
│  └─ routes.js        モデルコースデータ
├─ assets/
│  ├─ images/          写真素材(準備中)
│  ├─ videos/          HERO動画(準備中: assets/videos/hero-genbikei.mp4)
│  └─ og/              OGP画像(準備中)
├─ about/               ABOUT
├─ policy/              運営ポリシー
├─ privacy/             プライバシーポリシー
├─ disclaimer/          免責事項
├─ contact/             お問い合わせ・写真動画提供
├─ correction/          情報訂正・削除依頼
├─ 404.html
├─ robots.txt
└─ sitemap.xml
```

## 更新方法

- スポットを追加・修正する場合は `data/spots.js` を編集する
- モデルコースを追加・修正する場合は `data/routes.js` を編集する
- 営業時間・料金等の未確認情報は絶対に推測で記載しない。確認できない場合は「data pending」または「要確認」として管理する
- `verifiedAt` は情報を確認した日付に更新する

## 公開方法

GitHub Pagesの設定でこのリポジトリのルート(`/`)を公開ソースに指定する。ビルド工程は不要(単一HTML+CSS+Vanilla JS構成)。

## 禁止事項

- React/Next.js/Vue等のフレームワークへの独断での移行
- 有料API・有料CMS・独自バックエンドの導入
- APIキー・秘密鍵・個人情報のリポジトリへの保存
- 第三者写真(Google Maps・SNS・他サイト等)の無断転載
- 営業時間・料金・ペット可否・所要時間等の推測による掲載

## 未実装・不足素材(Phase 1 BETA時点)

- HERO動画・写真素材(全体的にプレースホルダー)
- 写真投稿の実アップロード機構(現状メール受付のみ)
- 正式な問い合わせ用メールアドレス
- アクセス解析ツールの導入
- バス運賃・タクシー料金等の未確認情報

## 上位文書

- GENBI342プロジェクト サイト運営計画仕様書 Version 1.0 FINAL(MASTER)
- GENBI342プロジェクト Phase 1 BETA Webサイト開発仕様書 Version 1.0
