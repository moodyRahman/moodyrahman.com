let colors = [
    {
        "bg-color": "#07093c",
        "text-color": "#FFF8E7",
        "accent": "#FFF8E7",
        "icon": "#FFF8E7",
        "name": "cosmic"
    },
    {
        "bg-color": "#795879",
        "text-color": "#E8E8E8",
        "accent": "#E9DDE7",
        "icon": "#C3A29E",
        "name": "fairy-like"
    },
    {
        "bg-color": "#000000",
        "text-color": "#F41515",
        "accent": "#EEEEEE",
        "icon": "#DC5F00",
        "name": "evil"
    },
    {
        "bg-color": "#182747",
        "text-color": "#D8D8D8",
        "accent": "#7E9A84",
        "icon": "#D8D8D8",
        "name": "aquatic"
    },
    {
        "bg-color": "#272727",
        "text-color": "#D4AA7D",
        "accent": "#EFD09E",
        "icon": "#D2D8B3",
        "name": "luxurious"
    },
    {
        "bg-color": "#EDBFC6",
        "text-color": "#654B43",
        "accent": "#5F4842",
        "icon": "#432E36",
        "name": "psittacina"
    },
    {
        "bg-color": "#006d77",
        "text-color": "#edf6f9",
        "accent": "#C7E6E4",
        "icon": "#e29578",
        "name": "rainy, but like, in a nice way"
    },
    {
        "bg-color": "#1155DF",
        "text-color": "#1C1018",
        "accent": "#ffe700",
        "icon": "#04c4ec",
        "name": "neon"
    },
    {
        "bg-color": "#3a2558",
        "text-color": "#C3B7D7",
        "accent": "#A592C9",
        "icon": "#6a518a",
        "name": "pulsating"
    },
    {
        "bg-color": "#F00000",
        "text-color": "#000000",
        "accent": "#FFEBEB",
        "icon": "#ff3938",
        "name": "wretched"
    },
    {
        "bg-color": "#fc9f9f",
        "text-color": "#424242",
        "accent": "#791616",
        "icon": "#fdaaaa",
        "name": "like bubblegum"
    },
    {
        "bg-color": "#e34029",
        "bg-color": "#0D5D56",
        "text-color": "#8FD5A6",
        "accent": "#329F5B",
        "icon": "#8FD5A6",
        "name": "verdant"
    },
    {
        "bg-color": "#000000",
        "text-color": "#008F11",
        "accent": "#008F11",
        "icon": "#008F11",
        "name": "in the matrix"

    },

];

let done = [];
const orig = colors.length;
const element = document.getElementById("lucky");
const lucky = (e) => {

    if (done.length === orig) {
        colors = [...done];
        done.length = 0;
    }


    const color = colors[Math.floor(Math.random() * colors.length)];
    colors.splice(colors.indexOf(color), 1);
    done.push(color);

    for (const key in color) {
        document.documentElement.style.setProperty(`--${key}`, color[key]);
    }

    element.querySelector("span").innerHTML = `im feelin' <i>${color.name}</i>`;
};


element.addEventListener("click", lucky);


let fallen = false;

const collapse = (e) => {
    e.preventDefault();
    if (fallen) return;
    fallen = true;

    const { Engine, Runner, Bodies, Body, Composite, Events } = Matter;

    const root = document.documentElement;
    const viewport = window.innerHeight;
    const startHeight = Math.max(root.scrollHeight, viewport);
    const width = root.clientWidth;
    const getFloor = () => window.scrollY + window.innerHeight;

    // measure everything before pulling anything out of the layout
    const pieces = [...document.querySelectorAll("p, h4, .proj-link, .section > a")].map(el => {
        const r = el.getBoundingClientRect();
        return {
            el,
            x: r.left + window.scrollX,
            y: r.top + window.scrollY,
            w: r.width,
            h: r.height,
        };
    });

    // extra room below so there's still somewhere to scroll once everything is out of the flow
    document.body.style.height = `${startHeight + viewport * 2}px`;
    root.style.overflowX = "hidden";

    const engine = Engine.create({positionIterations:10, velocityIterations:10});
    engine.gravity.y = 0.5

    // the floor is the bottom edge of what's on screen, so it moves as you scroll.
    // it's thick so fast scrolling can't tunnel things through it.
    const THICK = 2000;
    const floor = Bodies.rectangle(width / 2, getFloor() + THICK / 2, width * 4, THICK, { isStatic: true });
    const wallL = Bodies.rectangle(-THICK / 2, startHeight, THICK, startHeight * 10, { isStatic: true });
    const wallR = Bodies.rectangle(width + THICK / 2, startHeight, THICK, startHeight * 10, { isStatic: true });
    Composite.add(engine.world, [floor, wallL, wallR]);

    for (const p of pieces) {
        const s = p.el.style;
        s.position = "absolute";
        s.left = "0px";
        s.top = "0px";
        s.width = `${p.w}px`;
        s.margin = "0";
        s.boxSizing = "border-box";
        s.zIndex = "1";

        p.body = Bodies.rectangle(p.x + p.w / 2, p.y + p.h / 2, p.w, p.h, {
            restitution: 0.3,
            friction: 0.1,
            frictionAir: 0.01,
        });
        // held in place until its turn to fall
        Body.setStatic(p.body, true);
        Composite.add(engine.world, p.body);

        setTimeout(() => {
            Body.setStatic(p.body, false);
            // a small hop up and a random push, so they don't all land in one pile
            Body.setVelocity(p.body, { x: (Math.random() - 0.5) * 12, y: -(5 + Math.random() * 2) });
            Body.setAngularVelocity(p.body, (Math.random() - 0.5) * 0.1);
        }, Math.random() * 250);
    }

    Events.on(engine, "beforeUpdate", () => {
        Body.setPosition(floor, { x: width / 2, y: getFloor() + THICK / 2 });
    });

    Events.on(engine, "afterUpdate", () => {
        for (const p of pieces) {
            const { x, y } = p.body.position;
            p.el.style.transform = `translate(${x - p.w / 2}px, ${y - p.h / 2}px) rotate(${p.body.angle}rad)`;
        }
    });

    for (const p of pieces) {
        p.el.style.transform = `translate(${p.x}px, ${p.y}px)`;
    }

    // elements can change size after they fall (e.g. a tooltip opening on click),
    // so keep each body matched to its element's current size
    const resizer = new ResizeObserver(entries => {
        for (const entry of entries) {
            const p = pieces.find(piece => piece.el === entry.target);
            const w = p.el.offsetWidth;
            const h = p.el.offsetHeight;
            if (Math.abs(w - p.w) < 1 && Math.abs(h - p.h) < 1) continue;
            Body.scale(p.body, w / p.w, h / p.h);
            p.w = w;
            p.h = h;
        }
    });
    for (const p of pieces) resizer.observe(p.el);

    Runner.run(Runner.create(), engine);
};

document.getElementById("fall").addEventListener("click", collapse);


const buttons = document.querySelectorAll(".proj-link");

buttons.forEach(button => {

    button.addEventListener("click", async (e) => {
        const t = button.querySelector(".tool-tip");
        t.style.display = "inline";
        !button.classList.contains("active") ? (() => { button.classList.add("active"); e.preventDefault() })() : void (0);
    })

    // const tip = button.querySelector(".tool-tip");
    // button.addEventListener("mouseover", starter(tip));
    // button.addEventListener("touchstart", starter(tip));
    // button.addEventListener("mouseout", ender(tip));
    // button.addEventListener("touchend", ender(tip));
});
