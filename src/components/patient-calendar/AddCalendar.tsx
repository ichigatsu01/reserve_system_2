import FullCalendar from '@fullcalendar/react'
import { Box } from '@mui/material'
import type { EventContentArg } from 'fullcalendar/index.js'
import timeGridPlugin from '@fullcalendar/timegrid'

const events = [
    // 営業時間外の色を強調したい
    {
    daysOfWeek: [0, 3],
    display: 'background',
    color: '#000'
    },
    {
    startTime: '13:00',
    endTime: '16:00',
    daysOfWeek: [1, 2, 4, 5],
    display: 'background',
    color: '#000'
    },
    {
    startTime: '13:00',
    endTime: '21:00',
    daysOfWeek: [6],
    display: 'background',
    color: '#000'
    },
    // ここから通常イベント
    { title: '予約済み（現在時刻）', start: new Date()}
]

function executeCalendar() {
    return (
        <Box sx={{backgroundColor: '#fff', padding: '20px', borderRadius: '20px'}}>
            <FullCalendar
                plugins={[timeGridPlugin]} // これを読み込ませないとtimeGridWeekが動かない
                initialView='timeGridWeek' // カレンダーを週単位で表示する
                events={events} // カレンダー内に表示するイベント
                eventContent={renderEventContent} // イベントのうち何を表示するかを調整する
                locale={'ja'} // 日本語表記
                height={'auto'} // これがないと画面の高さを大きく取ってしまう
                allDaySlot={false} // trueの場合、カレンダーのトップに各日付の全体を指定するエリアが表示される
                eventColor='#888' // 既に予約が入っている、休診日などは灰色
                slotMinTime={'09:00:00'} // 始業時間
                slotMaxTime={'21:00:00'} // 就業時間
                slotDuration={'00:30:00'} // 30分単位で表示する
            />
        </Box>
    )
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

const AddCalendar = () => {
    return (
        <Box sx={{my: '20px'}}>
            {executeCalendar()}
        </Box>
    )
}

export default AddCalendar
