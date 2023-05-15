# prisma の使い方について

1. 必要なモジュールのインストール
   下記のコマンドをターミナルで実行。

   ```typescript
        npm i
   ```

2. 現在のテーブルの確認
   以下のコードをターミナルで実行し、prisma の studio を起動。
   GUI で現在のテーブルのデータを確認したり、追加・編集等が行える。

   ```typescript
        npx prisma studio
   ```

3. 新しいテーブルの作成
   /prisma/schema.prisma のファイルに追加したいテーブルをモデルとして追加。
   データの種類等の記載方法は既存のコードを参照。
   モデル追加後、下記のコードをターミナルで実行(hogehoge は任意の名前に変更)。

   ```typescript
        npx prisma migrate dev --name hogehoge
   ```

   上記のコマンド実行の際にエラーが発生した場合は、下記のコマンドを実行することで一度データをリセットすることが可能。
   ※ただし、それまでに登録したデータが全て消えてしまうことに注意。

   ```typescript
        npx prisma migrate reset
   ```

# api の使用方法について

1. 必要なモジュールのインストール(prisma で実行してる場合はスキップ)
   下記のコマンドをターミナルで実行。

   ```typescript
       npm i
   ```

2. users テーブルに対するリクエスト

   - 全てのユーザーデータを取得:'/users'に対して GET
   - 特定のユーザーデータを取得:'/users/:id'に対して GET
   - ユーザーデータを送信:'/users'に対して POST(body に neme,email,password,departmentId を含めることが必須)
   - ユーザーデータを変更:'/users/:id'に対して PUT(body に変更したいデータを含める)
   - ユーザーデータを削除:'/users/:id'に対して DELETE

3. daily_attendance テーブルに対するリクエスト

   - 全ての日次勤怠データを取得: '/day'に対して GET
   - 特定のユーザーの日次勤怠データを取得: '/day/:id'に対して GET
   - 日次勤怠データを登録: '/day'に対して POST(body に日次勤怠データ(データ ER 図を参照)を含める)
   - 日次勤怠データを変更: '/day/:id'に対して PUT(body に日次勤怠データの id を含めることが必須)
   - 日次勤怠データを削除: '/day/:id'に対して DELETE(body に日次勤怠データの id を含めることが必須)

4. monthly_attendance テーブルに対するリクエスト
   - 全ての月次勤怠データを取得: '/day'に対して GET
   - 特定のユーザーの月次勤怠データを取得: '/day/:id'に対して GET
   - 月次勤怠データを登録: '/day'に対して POST(body に月次勤怠データ(データ ER 図を参照)を含める)
   - 月次勤怠データを変更: '/day/:id'に対して PUT(body に月次勤怠データの id を含めることが必須)
   - 月次勤怠データを削除: '/day/:id'に対して DELETE(body に月次勤怠データの id を含めることが必須)
