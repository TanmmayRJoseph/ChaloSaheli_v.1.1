"use client";
import { useState } from "react";
import Image from "next/image";

export default function SecureSaheliPage() {
  const [popup, setPopup] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [stewardNumber] = useState(
    "+91 " + Math.floor(1000000000 + Math.random() * 9000000000)
  );

  const closePopup = () => {
    setPopup("");
    setChatInput("");
  };

  const handleSendMessage = () => {
    if (chatInput.trim() !== "") {
      setChatMessages([...chatMessages, chatInput]);
      setChatInput("");
    }
  };

  const callNumber = (number: string) => {
    window.location.href = `tel:${number.replace(/\s+/g, "")}`;
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-pink-100 text-center p-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 py-4 flex justify-center">
        <h1 className="text-4xl font-bold text-pink-600">SecureSaheli</h1>
      </div>

      {/* First Row */}
      <div className="flex justify-around w-full mt-24">
        <div className="police flex flex-col items-center">
          <Image
            src="/image/police.png"
            alt="Police"
            width={150}
            height={150}
            onClick={() => setPopup("police")}
            className="cursor-pointer"
          />
          <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">
            Call Police
          </button>
        </div>

        <div className="emergency flex flex-col items-center">
          <Image
            src="/image/callsign.png"
            alt="Emergency Contact"
            width={150}
            height={150}
            onClick={() => setPopup("emergency")}
            className="cursor-pointer"
          />
          <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">
            Call Emergency Contact
          </button>
        </div>

        <div className="Ambulance flex flex-col items-center">
          <Image
            src="/image/ambulance.png"
            alt="Ambulance"
            width={260}
            height={260}
            onClick={() => setPopup("ambulance")}
            className="cursor-pointer"
          />
          <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">
            Call Ambulance
          </button>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex justify-around w-full mt-6">
        <div className="safety-steward flex flex-col items-center">
          <Image
            src="/image/safety.png"
            alt="Safety Steward"
            width={150}
            height={150}
            onClick={() => setPopup("steward")}
            className="cursor-pointer"
          />
          <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">
            Call Safety Steward
          </button>
        </div>

        <div className="chatsupport flex flex-col items-center">
          <Image
            src="/image/chat.png"
            alt="Chat Support"
            width={150}
            height={150}
            onClick={() => setPopup("chat")}
            className="cursor-pointer"
          />
          <button className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 w-full">
            Chat Support
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {popup && (
        <div className="h-screen fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">
              {popup === "police" && "Police Helpline"}
              {popup === "emergency" && "Emergency Contact"}
              {popup === "ambulance" && "Ambulance Service"}
              {popup === "steward" && "Safety Steward"}
              {popup === "chat" && "Chat Support"}
            </h2>

            <div className="text-black text-lg mb-4 max-h-64 overflow-y-auto">
              {popup === "police" && <p>Dial 100 for Police Assistance</p>}
              {popup === "emergency" && (
                <p>Call: +91 98765 43210 (Emergency Contact)</p>
              )}
              {popup === "ambulance" && <p>Dial 102 for Ambulance Service</p>}

              {popup === "steward" && (
                <div>
                  <p className="font-semibold text-lg mb-4">{stewardNumber}</p>
                </div>
              )}

              {popup === "chat" && (
                <div className="flex flex-col items-start gap-2">
                  <div className="w-full h-40 overflow-y-auto border p-2 mb-2 rounded bg-gray-100 text-left">
                    {chatMessages.length === 0 ? (
                      <p className="text-gray-500 italic">No messages yet.</p>
                    ) : (
                      chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className="bg-pink-100 p-2 rounded mb-1 text-sm"
                        >
                          You: {msg}
                        </div>
                      ))
                    )}
                  </div>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-500"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="mt-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 self-end"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            {(popup === "police" ||
              popup === "emergency" ||
              popup === "ambulance" ||
              popup === "steward") && (
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => {
                    const number =
                      popup === "police"
                        ? "100"
                        : popup === "ambulance"
                        ? "102"
                        : popup === "emergency"
                        ? "+919876543210"
                        : stewardNumber;
                    callNumber(number);
                  }}
                  className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                >
                  Call
                </button>
                <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-300 text-black font-bold rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            )}

            {popup === "chat" && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-gray-300 text-black font-bold rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
