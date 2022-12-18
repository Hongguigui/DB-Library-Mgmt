create event minusOneSecond 
on schedule every 1 day do
	update borrows
	set timeLeft = timeLeft - 1

create event markLate
on schedule every 1 hour do
	update borrows set late = 1 where borrows.timeLeft < 0

-- run this to disable event
-- alter event minusOneSecond disable
-- alter event markLate disable
