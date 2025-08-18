
import { useEffect, useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqData = [
  {
    id: 1,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return, and we'll provide you with a prepaid shipping label.",
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options are available for 1-2 day delivery. International shipping times vary by location but generally take 7-14 business days.",
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. You can see the exact shipping cost and estimated delivery time at checkout before completing your purchase.",
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or directly with the shipping carrier. You'll also receive updates on your order status throughout the delivery process.",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with SSL encryption to protect your payment information.",
  },
  {
    id: 6,
    question: "Can I cancel or modify my order?",
    answer:
      "You can cancel or modify your order within 1 hour of placing it by contacting our customer service team. After this window, orders enter our fulfillment process and cannot be changed, but you can still return items once received.",
  },
]

export default function FAQs() {
  const [openItems, setOpenItems] = useState(new Set())

   useEffect(() => {
      document.title = "FAQs | LifeSure";
    }, []);

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our products, shipping, and policies. Can't find what you're looking
          for? Contact our support team.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              aria-expanded={openItems.has(item.id)}
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
              <div className="flex-shrink-0">
                {openItems.has(item.id) ? (
                  <Minus className="w-5 h-5 text-blue-600 transform transition-transform duration-200" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 transform transition-transform duration-200" />
                )}
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems.has(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-5">
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed animate-fade-in">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

