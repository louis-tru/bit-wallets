/**
 * @copyright © 2018 Copyright dphone.com
 * @date 2019-12-16
 */

#include <time.h>
#include <stdlib.h>

#if defined(__APPLE__)
#include <mach/mach_time.h>
#include <mach/mach.h>
#include <mach/clock.h>

#define clock_gettime clock_gettime2

static clock_serv_t get_clock_port(clock_id_t clock_id) {
	clock_serv_t clock_r;
	host_get_clock_service(mach_host_self(), clock_id, &clock_r);
	return clock_r;
}

static clock_serv_t clock_realtime = get_clock_port(CALENDAR_CLOCK);
static mach_port_t clock_monotonic = get_clock_port(SYSTEM_CLOCK);

int clock_gettime2(clockid_t id, struct timespec *tspec) {
	mach_timespec_t mts;
	int retval = 0;
	if (id == CLOCK_MONOTONIC) {
		retval = clock_get_time(clock_monotonic, &mts);
		if (retval != 0) {
			return retval;
		}
	} else if (id == CLOCK_REALTIME) {
		retval = clock_get_time(clock_realtime, &mts);
		if (retval != 0) {
			return retval;
		}
	} else {
		/* only CLOCK_MONOTOIC and CLOCK_REALTIME clocks supported */
		return -1;
	}
	tspec->tv_sec = mts.tv_sec;
	tspec->tv_nsec = mts.tv_nsec;
	return 0;
}

#endif

int64_t time_monotonic() {
	struct timespec now;
	clock_gettime(CLOCK_MONOTONIC, &now);
	int64_t r = now.tv_sec * 1000000LL + now.tv_nsec / 1000LL;
	return r;
}
