create event minusOneSecond 
on schedule every 1 day do
	update borrows
	set timeLeft = timeLeft - 1

-- run this to disable evenet
-- alter event autoDayUpdate disable