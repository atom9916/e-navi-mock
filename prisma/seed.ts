import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const state = await prisma.state.createMany({
    data: [{ name: '未入力' }, { name: '入力済' }, { name: '承認待ち' }, { name: '承認済' }]
  })
  console.log(`stateテーブルのデータを作成しました ${state}`)

  const attendance = await prisma.attendance.createMany({
    data: [
      { name: '出勤' },
      { name: '有給' },
      { name: '半休' },
      { name: '慶弔休' },
      { name: '欠勤' },
      { name: '休日出' }
    ]
  })

  console.log(`attendanceテーブルにデータを作成しました ${attendance}`)

  const tardiness = await prisma.tardiness.createMany({
    data: [
      { name: 'なし' },
      { name: '電車遅延' },
      { name: '自己都合' },
      { name: '会社都合' },
      { name: 'その他' }
    ]
  })

  console.log(`tardinessテーブルにデータを作成しました ${tardiness}`)

  const paidOff = await prisma.paid_off.createMany({
    data: [
      { user_id: 'test1' },
      { user_id: 'test2' },
      { user_id: 'test3' },
      { user_id: 'test4' },
      { user_id: 'test5' }
    ]
  })

  console.log(`paid_offテーブルにデータを追加しました${paidOff}`)

  const shift = await prisma.shift.createMany({
    data: [
      { name: '一日社内業務' },
      { name: '定時後社内業務' },
      { name: '午前社内業務' },
      { name: '午後社内業務' },
      { name: 'オフピーク勤務' }
    ]
  })

  console.log(`shiftテーブルにデータを作成しました ${shift}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
