import React, { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
};

type Message = {
  id: number;
  sender: "owner" | "streamer";
  text: string;
  time: string;
  type?: "text" | "image" | "voice" | "file";
};

type Conversation = {
  id: number;
  name: string;
  email: string;
  unread: number;
  lastMessage: string;
  messages: Message[];
};

const products: Product[] = [
  {
    id: 1,
    name: "YouTube Growth Strategy",
    price: 30,
    category: "YouTube",
    description:
      "A practical strategy blueprint showing creators how to approach YouTube growth more systematically.",
  },
  {
    id: 2,
    name: "Twitch Growth Strategy",
    price: 30,
    category: "Twitch",
    description:
      "A practical streamer growth blueprint covering promotion, discovery, communities and consistent channel growth.",
  },
  {
    id: 3,
    name: "TikTok Growth Strategy",
    price: 30,
    category: "TikTok",
    description:
      "A practical TikTok strategy blueprint for creators who want a clearer content and promotion plan.",
  },
  {
    id: 4,
    name: "Instagram Growth Strategy",
    price: 30,
    category: "Instagram",
    description:
      "A practical Instagram growth blueprint covering content, discovery and audience-building methods.",
  },
  {
    id: 5,
    name: "Facebook Growth Strategy",
    price: 30,
    category: "Facebook",
    description:
      "A creator-focused Facebook strategy blueprint for building visibility and reaching relevant audiences.",
  },
  {
    id: 6,
    name: "Discord Growth Strategy",
    price: 30,
    category: "Discord",
    description:
      "A strategy blueprint for building and using Discord communities around your creator brand.",
  },
  {
    id: 7,
    name: "X/Twitter Growth Strategy",
    price: 30,
    category: "X/Twitter",
    description:
      "A practical strategy for improving creator visibility and networking on X/Twitter.",
  },
  {
    id: 8,
    name: "LinkedIn Growth Strategy",
    price: 30,
    category: "LinkedIn",
    description:
      "A creator-focused LinkedIn strategy blueprint for professional visibility and audience growth.",
  },
  {
    id: 9,
    name: "Pinterest Growth Strategy",
    price: 30,
    category: "Pinterest",
    description:
      "A practical Pinterest discovery and content strategy for creators.",
  },
  {
    id: 10,
    name: "Reddit Growth Strategy",
    price: 30,
    category: "Reddit",
    description:
      "A community-first Reddit strategy blueprint focused on relevant communities and useful participation.",
  },
  {
    id: 11,
    name: "Telegram Growth Strategy",
    price: 30,
    category: "Telegram",
    description:
      "A strategy blueprint for using Telegram as part of a creator community system.",
  },
  {
    id: 12,
    name: "WhatsApp Growth Strategy",
    price: 30,
    category: "WhatsApp",
    description:
      "A practical strategy for using WhatsApp communities and communication effectively.",
  },
  {
    id: 13,
    name: "Snapchat Growth Strategy",
    price: 30,
    category: "Snapchat",
    description:
      "A Snapchat strategy blueprint for creators looking to improve discovery and audience engagement.",
  },
  {
    id: 14,
    name: "Kick Growth Strategy",
    price: 30,
    category: "Kick",
    description:
      "A streamer-focused Kick growth strategy covering discovery and promotion planning.",
  },
  {
    id: 15,
    name: "Custom Social Media Strategy",
    price: 30,
    category: "Custom",
    description:
      "A customized social media strategy built around the creator's selected platforms and goals.",
  },

  {
    id: 16,
    name: "YouTube + Twitch Strategy",
    price: 50,
    category: "Bundle",
    description:
      "A combined strategy blueprint for creators using both YouTube and Twitch.",
  },
  {
    id: 17,
    name: "TikTok + Instagram Strategy",
    price: 55,
    category: "Bundle",
    description:
      "A combined short-form and social discovery strategy for TikTok and Instagram.",
  },
  {
    id: 18,
    name: "YouTube + TikTok Strategy",
    price: 60,
    category: "Bundle",
    description:
      "A cross-platform strategy connecting YouTube content with TikTok discovery.",
  },
  {
    id: 19,
    name: "Twitch + Discord Strategy",
    price: 60,
    category: "Bundle",
    description:
      "A streamer strategy combining Twitch discovery with Discord community building.",
  },
  {
    id: 20,
    name: "YouTube + Instagram + TikTok Strategy",
    price: 80,
    category: "Bundle",
    description:
      "A three-platform creator growth strategy covering content and discovery.",
  },
  {
    id: 21,
    name: "Twitch + TikTok + Discord Strategy",
    price: 85,
    category: "Bundle",
    description:
      "A streamer-focused combination of Twitch, TikTok and Discord strategies.",
  },
  {
    id: 22,
    name: "YouTube + Twitch + TikTok Strategy",
    price: 95,
    category: "Bundle",
    description:
      "A cross-platform strategy connecting long-form content, livestreaming and short-form discovery.",
  },
  {
    id: 23,
    name: "YouTube + Twitch + TikTok + Discord Strategy",
    price: 120,
    category: "Bundle",
    description:
      "A complete multi-platform creator strategy covering content, livestreaming and community.",
  },
  {
    id: 24,
    name: "Custom Multi-Platform Strategy",
    price: 150,
    category: "Custom Bundle",
    description:
      "A customized multi-platform strategy based on the creator's selected platforms and goals.",
  },
];

const initialMessages: Conversation[] = [
  {
    id: 1,
    name: "Demo Streamer",
    email: "streamer@example.com",
    unread: 0,
    lastMessage: "Hi Agbota, I have a question about the strategy.",
    messages: [
      {
        id: 1,
        sender: "streamer",
        text: "Hi Agbota, I have a question about the strategy.",
        time: "10:32 AM",
      },
      {
        id: 2,
        sender: "owner",
        text: "Sure. Send me your question and I'll get back to you.",
        time: "10:35 AM",
      },
    ],
  },
];

export default function App() {
  const [page, setPage] = useState<
    "home" | "shop" | "messages" | "login" | "register" | "orders" | "admin"
  >("home");

  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] =
    useState<Conversation[]>(initialMessages);

  const [messageText, setMessageText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMade, setPaymentMade] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const filteredProducts = useMemo(() => {
    const value = search.toLowerCase();

    if (!value) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value)
    );
  }, [search]);

  const sendMessage = () => {
    if (!isLoggedIn) {
      setPage("login");
      return;
    }

    if (!selectedConversation || !messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: isOwner ? "owner" : "streamer",
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((current) =>
      current.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              lastMessage: newMessage.text,
              messages: [...conversation.messages, newMessage],
            }
          : conversation
      )
    );

    setSelectedConversation((current) =>
      current
        ? {
            ...current,
            lastMessage: newMessage.text,
            messages: [...current.messages, newMessage],
          }
        : null
    );

    setMessageText("");
  };

  const markPaymentMade = () => {
    if (!isLoggedIn) {
      setPage("login");
      return;
    }

    setPaymentMade(true);
    setPaymentConfirmed(false);
  };

  const confirmPayment = () => {
    setPaymentConfirmed(true);
    setPaymentMade(true);
  };

  const openMessages = () => {
    if (!isLoggedIn) {
      setPage("login");
      return;
    }

    setPage("messages");

    if (!selectedConversation && messages.length > 0) {
      setSelectedConversation(messages[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        button {
          font: inherit;
        }

        .brand-gradient {
          background: linear-gradient(135deg, #111827, #334155);
        }

        .hero-gradient {
          background:
            radial-gradient(circle at top right, rgba(99,102,241,.18), transparent 35%),
            radial-gradient(circle at bottom left, rgba(14,165,233,.12), transparent 35%),
            #0f172a;
        }
      `}</style>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl brand-gradient text-lg font-black text-white shadow-lg">
              AS
            </div>

            <div className="text-left">
              <div className="text-base font-black tracking-tight">
                Agbota Segun
              </div>
              <div className="text-xs text-slate-500">
                Creator Strategy Store
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            <button
              onClick={() => setPage("home")}
              className="text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              Home
            </button>

            <button
              onClick={() => setPage("shop")}
              className="text-sm font-semibold text-slate-600 hover:text-slate-950"
            >
              Strategies
            </button>

            <button
              onClick={openMessages}
              className="relative text-sm font-bold text-slate-700 hover:text-slate-950"
            >
              Messages
              {messages.some((m) => m.unread > 0) && (
                <span className="absolute -right-4 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  !
                </span>
              )}
            </button>

            {isLoggedIn && (
              <button
                onClick={() => setPage("orders")}
                className="text-sm font-semibold text-slate-600 hover:text-slate-950"
              >
                My Orders
              </button>
            )}
          </nav>

          <div className="flex items-center gap-2">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setPage("login")}
                  className="hidden rounded-lg px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 sm:block"
                >
                  Log in
                </button>

                <button
                  onClick={() => setPage("register")}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow hover:bg-slate-800"
                >
                  Sign up
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsOwner(false);
                  setPage("home");
                }}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HOME */}
      {page === "home" && (
        <>
          <section className="hero-gradient">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <div className="max-w-3xl">
                <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-white">
                  CREATOR & STREAMER GROWTH STRATEGIES
                </div>

                <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                  Build a Smarter Growth Strategy for Your Channel.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                  Practical creator and streamer strategy blueprints designed
                  to show you what to do, where to promote, communities to
                  explore, and how to build a more consistent growth system.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => setPage("shop")}
                    className="rounded-xl bg-white px-6 py-3 font-black text-slate-900 shadow-xl hover:bg-slate-100"
                  >
                    Explore Strategies
                  </button>

                  <button
                    onClick={openMessages}
                    className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-black text-white hover:bg-white/15"
                  >
                    Message Agbota Segun
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-indigo-600">
                  Strategy Library
                </p>
                <h2 className="mt-2 text-3xl font-black">
                  Choose Your Strategy
                </h2>
              </div>

              <button
                onClick={() => setPage("shop")}
                className="hidden text-sm font-black text-indigo-600 sm:block"
              >
                View all →
              </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => setSelectedProduct(product)}
                  onOrder={() => {
                    setSelectedProduct(product);
                    setPage("shop");
                  }}
                />
              ))}
            </div>
          </section>

          <section className="border-y border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <Feature
                number="01"
                title="Choose a Strategy"
                text="Pick the platform or bundle that matches what you're trying to build."
              />

              <Feature
                number="02"
                title="Get the Blueprint"
                text="Use the strategy as a practical roadmap instead of guessing what to do next."
              />

              <Feature
                number="03"
                title="Message Agbota"
                text="Sign in and use the private Messages area to communicate directly."
              />
            </div>
          </section>
        </>
      )}

      {/* SHOP */}
      {page === "shop" && (
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-sm font-black uppercase tracking-widest text-indigo-600">
              Strategy Store
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              Creator Growth Strategies
            </h1>

            <p className="mt-3 max-w-2xl text-slate-600">
              Choose an individual strategy or combine platforms with one of
              the available bundles.
            </p>

            <div className="mt-6">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search strategies..."
                className="w-full max-w-xl rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-500 focus:ring-2"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={() => setSelectedProduct(product)}
                onOrder={() => {
                  setSelectedProduct(product);
                  setShowPayment(true);
                }}
              />
            ))}
          </div>
        </main>
      )}

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700">
                  {selectedProduct.category}
                </span>

                <h2 className="mt-3 text-2xl font-black">
                  {selectedProduct.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="mt-5 leading-7 text-slate-600">
              {selectedProduct.description}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-3xl font-black">
                ${selectedProduct.price}
              </div>

              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setSelectedProduct(null);
                    setPage("login");
                    return;
                  }

                  setShowPayment(true);
                }}
                className="rounded-xl bg-slate-900 px-6 py-3 font-black text-white hover:bg-slate-800"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT PANEL */}
      {showPayment && selectedProduct && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Order & Payment</h2>

              <button
                onClick={() => setShowPayment(false)}
                className="rounded-lg px-3 py-2 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="font-bold">{selectedProduct.name}</p>
              <p className="mt-1 text-2xl font-black">
                ${selectedProduct.price}
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-black text-amber-900">
                Manual BTC Payment
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-800">
                Send the payment using the BTC address below. Payment must be
                manually verified before an order is marked as paid.
              </p>

              <div className="mt-4 break-all rounded-lg bg-white p-3 font-mono text-sm">
                1KbyAebAkdcvwd6wKjN6dyz16CoHpKrah1
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => {
                  setShowPayment(false);
                  setPage("messages");
                  setSelectedConversation(messages[0]);
                }}
                className="rounded-xl bg-slate-900 px-5 py-3 font-black text-white"
              >
                Message Agbota
              </button>

              <button
                onClick={() => {
                  setShowPayment(false);
                  setPage("messages");
                  setSelectedConversation(messages[0]);
                }}
                className="rounded-xl border border-slate-200 px-5 py-3 font-black"
              >
                Contact for PayPal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MESSAGES */}
      {page === "messages" && (
        <main className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">
          {!isLoggedIn ? (
            <AuthRequired
              title="Sign in to message Agbota Segun"
              text="You need a streamer account before you can use private messaging."
              onLogin={() => setPage("login")}
              onRegister={() => setPage("register")}
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="grid min-h-[650px] md:grid-cols-[320px_1fr]">
                {/* CONVERSATION SIDEBAR */}
                <aside className="border-r border-slate-200">
                  <div className="border-b border-slate-200 p-5">
                    <div className="flex items-center justify-between">
                      <h1 className="text-xl font-black">Messages</h1>

                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600">
                        {messages.reduce(
                          (total, item) => total + item.unread,
                          0
                        )}{" "}
                        Unread
                      </span>
                    </div>

                    <input
                      placeholder="Search messages..."
                      className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    {messages.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => {
                          setSelectedConversation(conversation);

                          setMessages((current) =>
                            current.map((item) =>
                              item.id === conversation.id
                                ? { ...item, unread: 0 }
                                : item
                            )
                          );
                        }}
                        className={`w-full border-b border-slate-100 p-4 text-left hover:bg-slate-50 ${
                          selectedConversation?.id === conversation.id
                            ? "bg-slate-50"
                            : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 font-black text-white">
                            AS
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between gap-2">
                              <p className="truncate font-black">
                                {isOwner
                                  ? conversation.name
                                  : "Agbota Segun"}
                              </p>

                              {conversation.unread > 0 && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
                                  {conversation.unread}
                                </span>
                              )}
                            </div>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {conversation.lastMessage}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </aside>

                {/* CHAT */}
                <section className="flex min-w-0 flex-col">
                  {selectedConversation ? (
                    <>
                      <div className="border-b border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-black text-white">
                            AS
                          </div>

                          <div>
                            <p className="font-black">
                              {isOwner
                                ? selectedConversation.name
                                : "Agbota Segun"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {isOwner
                                ? selectedConversation.email
                                : "Creator Strategy Store"}
                            </p>
                          </div>
                        </div>

                        {/* PAYMENT CONTROL AT TOP OF CHAT */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {!isOwner && !paymentMade && (
                            <button
                              onClick={markPaymentMade}
                              className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-black text-white hover:bg-amber-600"
                            >
                              💰 PAYMENT MADE
                            </button>
                          )}

                          {!isOwner && paymentMade && !paymentConfirmed && (
                            <div className="rounded-lg bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">
                              ⏳ Payment waiting for confirmation
                            </div>
                          )}

                          {!isOwner && paymentConfirmed && (
                            <div className="rounded-lg bg-green-50 px-4 py-2 text-sm font-black text-green-700">
                              ✅ PAYMENT CONFIRMED
                            </div>
                          )}

                          {isOwner && paymentMade && !paymentConfirmed && (
                            <button
                              onClick={confirmPayment}
                              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-black text-white hover:bg-green-700"
                            >
                              ✓ CONFIRM PAYMENT
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 sm:p-6">
                        {selectedConversation.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender ===
                              (isOwner ? "owner" : "streamer")
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[70%] ${
                                message.sender ===
                                (isOwner ? "owner" : "streamer")
                                  ? "bg-slate-900 text-white"
                                  : "bg-white text-slate-900 shadow-sm"
                              }`}
                            >
                              <p className="break-words text-sm leading-6">
                                {message.text}
                              </p>

                              <p className="mt-1 text-right text-[10px] opacity-60">
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* COMPOSER */}
                      <div className="border-t border-slate-200 bg-white p-3">
                        <div className="flex items-center gap-2">
                          <button
                            title="Send image"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                          >
                            🖼️
                          </button>

                          <button
                            title="Send file"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                          >
                            📎
                          </button>

                          <button
                            title="Voice message"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50"
                          >
                            🎙️
                          </button>

                          <input
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") sendMessage();
                            }}
                            placeholder="Write a message..."
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                          />

                          <button
                            onClick={sendMessage}
                            className="rounded-xl bg-slate-900 px-4 py-3 font-black text-white hover:bg-slate-800"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-1 items-center justify-center p-8 text-center">
                      <div>
                        <div className="text-5xl">💬</div>
                        <h2 className="mt-4 text-xl font-black">
                          Select a conversation
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                          Your conversations will appear here.
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          )}
        </main>
      )}

      {/* LOGIN */}
      {page === "login" && (
        <AuthPage
          mode="login"
          onSuccess={() => {
            setIsLoggedIn(true);
            setPage("home");
          }}
          onRegister={() => setPage("register")}
        />
      )}

      {/* REGISTER */}
      {page === "register" && (
        <AuthPage
          mode="register"
          onSuccess={() => {
            setIsLoggedIn(true);
            setPage("home");
          }}
          onRegister={() => setPage("login")}
        />
      )}

      {/* ORDERS */}
      {page === "orders" && (
        <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-black">My Orders</h1>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-black">Order #1042</p>
                <p className="mt-1 text-sm text-slate-500">
                  Strategy order
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                Awaiting Payment
              </span>
            </div>
          </div>
        </main>
      )}

      {/* ADMIN FRONTEND */}
      {page === "admin" && (
        <AdminPreview
          conversations={messages}
          onConfirmPayment={confirmPayment}
        />
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row">
            <div>
              <div className="font-black">Agbota Segun</div>
              <p className="mt-1 text-sm text-slate-500">
                Creator & streamer growth strategy store.
              </p>
            </div>

            <div className="text-sm text-slate-500">
              <p>Contact: agbotasegun.outreach@gmail.com</p>
              <p className="mt-1">WhatsApp: +234 814904668</p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 text-xs text-slate-400">
            © {new Date().getFullYear()} Agbota Segun. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* PRODUCT CARD */

function ProductCard({
  product,
  onSelect,
  onOrder,
}: {
  product: Product;
  onSelect: () => void;
  onOrder: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6">
        <div className="text-center text-white">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-xl font-black backdrop-blur">
            AS
          </div>

          <p className="mt-3 text-xs font-black uppercase tracking-widest text-slate-300">
            Strategy Blueprint
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
            {product.category}
          </span>

          <span className="text-xl font-black">${product.price}</span>
        </div>

        <h3 className="mt-4 text-lg font-black">{product.name}</h3>

        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
          {product.description}
        </p>

        <div className="mt-5 flex gap-2">
          <button
            onClick={onSelect}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-black hover:bg-slate-50"
          >
            Details
          </button>

          <button
            onClick={onOrder}
            className="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-black text-white hover:bg-slate-800"
          >
            Order
          </button>
        </div>
      </div>
    </article>
  );
}

/* FEATURE */

function Feature({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-sm font-black text-white">
        {number}
      </div>

      <h3 className="mt-4 text-lg font-black">{title}</h3>

      <p className="mt-2 leading-7 text-slate-500">{text}</p>
    </div>
  );
}

/* AUTH REQUIRED */

function AuthRequired({
  title,
  text,
  onLogin,
  onRegister,
}: {
  title: string;
  text: string;
  onLogin: () => void;
  onRegister: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
        🔒
      </div>

      <h1 className="mt-5 text-2xl font-black">{title}</h1>

      <p className="mt-3 leading-7 text-slate-500">{text}</p>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={onLogin}
          className="rounded-xl bg-slate-900 px-5 py-3 font-black text-white"
        >
          Log in
        </button>

        <button
          onClick={onRegister}
          className="rounded-xl border border-slate-200 px-5 py-3 font-black"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

/* AUTH */

function AuthPage({
  mode,
  onSuccess,
  onRegister,
}: {
  mode: "login" | "register";
  onSuccess: () => void;
  onRegister: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 font-black text-white">
            AS
          </div>

          <h1 className="mt-5 text-2xl font-black">
            {mode === "login" ? "Welcome back" : "Create your streamer account"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {mode === "login"
              ? "Log in to access your orders and private messages."
              : "Sign up before messaging Agbota Segun or placing orders."}
          </p>
        </div>

        {mode === "register" && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={onSuccess}
          className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 font-black text-white hover:bg-slate-800"
        >
          {mode === "login" ? "Log in" : "Create account"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={onRegister}
                className="font-black text-indigo-600"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={onRegister}
                className="font-black text-indigo-600"
              >
                Log in
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  );
}

/* ADMIN PREVIEW */

function AdminPreview({
  conversations,
  onConfirmPayment,
}: {
  conversations: Conversation[];
  onConfirmPayment: () => void;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-slate-900 p-6 text-white">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Owner Portal
        </p>

        <h1 className="mt-2 text-3xl font-black">Agbota Segun Admin</h1>

        <p className="mt-2 text-slate-400">
          Manage streamers, conversations, orders and payment confirmations.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="font-black">Unread Messages</h2>

          <div className="mt-4 space-y-2">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="flex justify-between">
                  <span className="font-bold">{conversation.name}</span>

                  {conversation.unread > 0 && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-black text-white">
                      {conversation.unread}
                    </span>
                  )}
                </div>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {conversation.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-black">Owner Controls</h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onConfirmPayment}
              className="rounded-xl bg-green-600 px-5 py-3 font-black text-white"
            >
              ✓ Confirm Buyer Payment
            </button>

            <button className="rounded-xl border border-slate-200 px-5 py-3 font-black">
              🖼️ Send Image
            </button>

            <button className="rounded-xl border border-slate-200 px-5 py-3 font-black">
              📎 Send File
            </button>

            <button className="rounded-xl border border-slate-200 px-5 py-3 font-black">
              🎙️ Voice Message
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
