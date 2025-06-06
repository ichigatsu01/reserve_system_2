import FullCalendar from '@fullcalendar/react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import type { DateClickArg, EventApi, EventClickArg } from 'fullcalendar/index.js';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useContext, useEffect, useState } from 'react';
import { InputContext } from '../providers/ReserveProvider';
import InputReserve from './InputReserve/InputReserve';
import ReserveConfirm from './InputReserve/ReserveConfirm';
import { loadPatient } from '../firebase/LoadReservePatient';
import { FunctionContext } from '../providers/FunctionProvider';

//* memo:
//* EventContentArg ... イベントの内容を表示するための型
//* DateClickArg ... 日付をクリックしたときの情報

type eventType = {
    daysOfWeek?: number[],
    display?: string,
    color?: string,
    startTime?: string,
    endTime?: string,
    title?: string,
    start?: string,
    end?: string,
    eventType: string,
    details?: string,
    petName?: string
}

const AddCalendar = () => {
    const { isOpenForm, setIsOpenForm, isOpenConfirm } = useContext(InputContext);
    const { patientNum } = useContext(FunctionContext);

    // !InputReserveに渡すargの獲得
    const [ dateArg, setDateArg ] = useState<DateClickArg | null>(null)

    // カレンダーに表示するイベント
    const [ allEvents, setAllEvents ] = useState<eventType[]>([
        {
        daysOfWeek: [0, 3],
        display: 'background',
        color: '#000',
        eventType: 'closed'
        },
        {
        startTime: '13:00',
        endTime: '16:00',
        daysOfWeek: [1, 2, 4, 5],
        display: 'background',
        color: '#000',
        eventType: 'closed'
        },
        {
        startTime: '13:00',
        endTime: '21:00',
        daysOfWeek: [6],
        display: 'background',
        color: '#000',
        eventType: 'closed'
        },
    ])

    // 患者予約取得
    useEffect(() => {
        const fetchData = async() => {
            const result = await loadPatient(patientNum);
            if (result) {
                setAllEvents(prev => [...prev, ...result]);
            }
        };
        fetchData();
    }, [])

    // 日付クリック関数
    useEffect(() => {
        if (dateArg) {
            setIsOpenForm(true)
        }
    }, [dateArg])
    const handleDateClick = (arg: DateClickArg) => {
        // 営業時間外は予約できないようにする
        const date = arg.date;
        const hour = date.getHours();
        const day = date.getDay(); // 0 = 日曜, 1 = 月曜, ..., 6 = 土曜
        
        // 診療時間外ロジック
        const isClosed =
            // 日曜・水曜は終日休診
            day === 0 || day === 3 ||
            // 月火木金：13〜16時は休診
            ([1, 2, 4, 5].includes(day) && hour >= 13 && hour < 16) ||
            // 土曜：13〜21時は休診
            (day === 6 && hour >= 13);
        if (isClosed) {
            alert('診療時間外です');
        } else {
            // alert('予約可能です');
            setDateArg(arg)
        }
    }

    // クリック...イベントのあるエリア
    const [ isOpenReserved, setIsOpenReserved ] = useState(false);
    const [ selectedEvent, setSelecedEvemt] = useState<EventApi | null>(null);

    const handleEventClick = (arg: EventClickArg) => {
        if (arg.event.extendedProps.eventType == 'closed') {
            return null;
        }
        if (arg.event.extendedProps.patientNum == patientNum) {
            setSelecedEvemt(arg.event);
            setIsOpenReserved(true);
        } else {
            alert('別の人の予約です');
        }
    }

    // Fullcalendarを作成する
    function executeCalendar() {
        return (
            <Box sx={{backgroundColor: '#fff', padding: '20px', borderRadius: '20px'}}>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin ]} // これを読み込ませないとtimeGridWeekが動かない
                    initialView='timeGridWeek' // カレンダーを週単位で表示する
                    events={allEvents} // カレンダー内に表示するイベント
                    eventContent={renderEventContent} // イベントのうち何を表示するかを調整する
                    locale={'ja'} // 日本語表記
                    height={'auto'} // これがないと画面の高さを大きく取ってしまう
                    allDaySlot={false} // trueの場合、カレンダーのトップに各日付の全体を指定するエリアが表示される
                    eventColor='#888' // 既に予約が入っている、休診日などは灰色
                    slotMinTime={'09:00:00'} // 始業時間
                    slotMaxTime={'21:00:00'} // 就業時間
                    slotDuration={'00:30:00'} // 30分単位で表示する
                    dayHeaderContent={function(arg) { // スマホでもシンプルに表示できるよう日付+曜日で表示
                        const date = arg.date;
                        const day = date.getDate();
                        const weekdayNames = ['日', '月', '火', '水', '木', '金', '土'];
                        const weekday = weekdayNames[date.getDay()];
                        const container = document.createElement('div')
                        container.innerHTML = `${day}<br><span>(${weekday})</span>`;
                        return { domNodes: [container]}
                    }}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    initialDate='2025-06-01'
                />
            </Box>
        )
    }

    // カレンダー内に表示する内容
    function renderEventContent() {
        // モバイル表示を意識し、色だけでの識別とする
        return null;
    }


    // ここから実際に表示する内容
    return (
        <>
            <Box sx={{my: '20px'}}>
                {executeCalendar()}
            </Box>
            {isOpenForm && <InputReserve dateArg={dateArg} />}
            {isOpenConfirm && <ReserveConfirm />}
            {isOpenReserved && selectedEvent && (
                <Dialog
                    open={isOpenReserved}
                    onClose={() => setIsOpenReserved(false)}
                >
                    <DialogTitle>あなたの予約です</DialogTitle>
                    <DialogContent>
                        <DialogContentText>予約日：{selectedEvent.start?.toLocaleString()}</DialogContentText>
                        <DialogContentText>ペットのお名前：{selectedEvent.extendedProps.petName}</DialogContentText>
                        <DialogContentText>診察内容：{selectedEvent.extendedProps.details}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsOpenReserved(false)}>閉じる</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}

export default AddCalendar
