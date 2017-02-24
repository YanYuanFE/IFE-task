function createDq() {
    var dq = [],
        size = 0;
    return {
        setDq: function(queue) {
            dq = queue;
            size = queue.length;
        },
        queue: function(fn) {
            size++;
            dq.push(fn);
        },
        dqueue: function() {
            size--;
            return dq.shift();
        },
        run: function(fn) {
            var me = this,
                timer;
            timer = setInterval(function() {
                if (size <= 1) {
                    clearInterval(timer);
                }
                fn.call(null, me.dqueue());
            }, 30);
        }
    }
}

function bubble() {
    var obs = [];

    function compare(x, y) {
        return x.w - y.w;
    }

    function swap(a, i, j) {
        var t = a[i];
        a[i] = a[j];
        a[j] = t;
    }

    function proxy(a, i, j) {
        notify(a[i].id + "-" + a[j].id);
        swap.apply(null, arguments);
    }

    function notify(arg) {
        obs[0].m.call(obs[0], arg);
    }
    return {
        addOb: function(ob) {
            obs.push(ob);
        },
        sort: function(arr) {
            var len = arr.length;
            for (var x = 1; x < len; x++) {
                for (var y = 0; y < len - x; y++) {
                    if (compare(arr[y], arr[y + 1]) > 0) {
                        proxy(arr, y, y + 1);
                    }
                }
            }
        }
    }
}
