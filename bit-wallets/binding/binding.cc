/**
 * @copyright © 2018 Copyright dphone.com
 * @date 2019-12-16
 */

#include <dncc.h>

using namespace v8;
using namespace dncc;

int64_t time_monotonic();

void timeMonotonic(const v8::FunctionCallbackInfo<v8::Value>& args) {
	// v8::HandleScope handle_scope(args.GetIsolate());
	args.GetReturnValue().Set( Nan::New<v8::Number>(time_monotonic() / 1000) );
}

void InitApi(v8::Local<v8::Object> target, v8::Local<v8::Value> unused, void* priv) {
	dncc::SetMethod(target, "timeMonotonic", timeMonotonic);
}

NODE_MODULE(hw, InitApi)
