/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bitcoin,
  CheckCircle,
  Clock,
  Copy,
  CreditCard,
  DollarSign,
  Eye,
  FileText,
  Loader2,
  Shield,
  Upload,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config/axiosconfig";
import { setDeposit } from "../Global/UserSlice";
import { AxiosError } from "axios";

type CryptoMethod = "btc" | "eth" | "usdt";

const Deposit = () => {
  const cryptoAddresses: Record<CryptoMethod, string> = {
    btc: "bc1qsay5uvf0j2adnuww8xfepdytkth77v0k90kwu0",
    eth: "0xD66fF48613396F6477A5AD03Af1b3A343274a410",
    usdt: "TPYuqJ8RzFv3qXJVGbhQ8YzyJW6xSoNmqZ",
  };

  const [selectedMethod, setSelectedMethod] = useState<CryptoMethod>("btc");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [showProof, setShowProof] = useState(false);
  const [proof, setProof] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const dispatch = useDispatch();
  const userToken = useSelector((state: any) => state.user.Token);

  console.log(userToken);

  const paymentMethods = useMemo(
    () => [
      {
        id: "btc",
        name: "Bitcoin",
        icon: <Bitcoin className="w-6 h-6" />,
        color: "from-orange-400 to-orange-600",
        fee: "Free",
        minDeposit: "$10",
        processingTime: "5-30 min",
        network: "BTC",
      },
      {
        id: "eth",
        name: "Ethereum",
        icon: <Wallet className="w-6 h-6" />,
        color: "from-blue-400 to-blue-600",
        fee: "Free",
        minDeposit: "$10",
        processingTime: "2-15 min",
        network: "ETH",
      },
      {
        id: "usdt",
        name: "USDT (TRC20)",
        icon: <DollarSign className="w-6 h-6" />,
        color: "from-green-400 to-green-600",
        fee: "Free",
        minDeposit: "$10",
        processingTime: "1-10 min",
        network: "TRC20",
      },
    ],
    []
  );

  const selectedPaymentMethod = useMemo(
    () => paymentMethods.find((m) => m.id === selectedMethod),
    [paymentMethods, selectedMethod]
  );

  const isValidAmount = useMemo(() => {
    const amt = parseFloat(amount);
    return !isNaN(amt) && amt > 0;
  }, [amount]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Address copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);

      toast.error("Failed to copy address");
    }
  };

  const handleProceed = () => {
    if (!isValidAmount) {
      toast.error("Enter a valid amount");
      return;
    }
    setShowProof(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image file (JPEG, PNG, GIF)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setProof(file);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      toast.success("Proof of payment uploaded successfully!");
    }
  };

  const removeProof = () => {
    setProof(null);
    setPreviewUrl("");
    setShowPreview(false);
    // Clear file input
    const fileInput = document.getElementById(
      "proof-upload"
    ) as HTMLInputElement | null;
    if (fileInput) fileInput.value = "";
  };

  // const nav = useNavigate();

  const handleSubmit = async () => {
    if (!proof) {
      toast.error("Please upload proof of payment");
      return;
    }

    const formData = new FormData();
    formData.append("mode", selectedMethod);
    formData.append("amount", amount);
    formData.append("image", proof);

    const toastId = toast.loading("Processing your deposit...");
    setIsLoading(true);

    try {
      const res = await axios.post("/user/deposit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });

      toast.success(res.data.message);
      dispatch(setDeposit(res.data.data));

      // Reset form
      setAmount("");
      setProof(null);
      setPreviewUrl("");
      setShowProof(false);
      setSelectedMethod("btc");
      // nav("/user/overview");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };

  const goBack = () => {
    setShowProof(false);
    setProof(null);
    setPreviewUrl("");
  };

  return (
    <div className="min-h-screen text-white relative">
      {/* Fixed background layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-green-900/30 to-slate-900/95"></div>
      <div className="fixed inset-0 bg-gradient-to-b from-green-400/5 to-green-500/5"></div>

      {/* Fixed animated particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-4 w-20 h-20 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-1/4 w-12 h-12 bg-green-400/8 rounded-full blur-lg animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-18 h-18 bg-emerald-400/6 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Scrollable content */}
      <div className="relative overflow-y-auto h-screen custom-scrollbar">
        <div className="p-6 pb-20">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              {showProof && (
                <button
                  onClick={goBack}
                  className="mr-4 p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-green-400" />
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center max-md:text-xl">
                  {/* <Wallet className="w-8 h-8 mr-3 text-green-400" /> */}
                  {showProof ? "Upload Proof of Payment" : "Make a Deposit"}
                </h1>
                <p className="text-slate-300 text-lg">
                  {showProof
                    ? "Upload your payment screenshot to complete the deposit"
                    : "Fund your account securely with cryptocurrency"}
                </p>
              </div>
            </div>
          </div>

          {!showProof ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left column: Payment Methods, Amount Input, Wallet Address */}
              <div className="lg:col-span-2 space-y-6">
                {/* Payment Methods */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-green-400" />
                    Select Payment Method
                  </h2>

                  <div className="grid md:grid-cols-3 gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() =>
                          setSelectedMethod(method.id as CryptoMethod)
                        }
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          selectedMethod === method.id
                            ? "border-green-400/50 bg-green-500/10 shadow-lg shadow-green-500/10"
                            : "border-green-500/20 bg-slate-900/30 hover:border-green-400/30"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-br ${method.color} shadow-lg`}
                          >
                            {method.icon}
                          </div>
                          {selectedMethod === method.id && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <h3 className="font-semibold text-white mb-1">
                          {method.name}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-slate-300">
                            Fee:{" "}
                            <span className="text-green-400">{method.fee}</span>
                          </p>
                          <p className="text-slate-300">
                            Min:{" "}
                            <span className="text-white">
                              {method.minDeposit}
                            </span>
                          </p>
                          <p className="text-slate-300">
                            Time:{" "}
                            <span className="text-green-400">
                              {method.processingTime}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Enter Amount
                  </h2>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter deposit amount (min $10)"
                      min="10"
                      className="w-full pl-10 pr-4 py-4 bg-slate-900/50 border border-green-500/20 rounded-lg text-white placeholder-slate-400 focus:border-green-400/50 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all"
                    />
                  </div>
                  {amount && !isValidAmount && (
                    <p className="text-red-400 text-sm mt-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Minimum deposit amount is $10
                    </p>
                  )}
                </div>

                {/* Wallet Address */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Payment Address
                  </h2>
                  <div className="bg-slate-900/60 border border-green-500/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">
                        {selectedPaymentMethod?.name} Address (
                        {selectedPaymentMethod?.network})
                      </span>
                      <button
                        onClick={() =>
                          copyToClipboard(cryptoAddresses[selectedMethod])
                        }
                        className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors px-2 py-1 rounded hover:bg-green-500/10"
                      >
                        {copied ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {copied ? "Copied!" : "Copy"}
                        </span>
                      </button>
                    </div>
                    <div className="break-all text-white font-mono text-sm bg-slate-900/80 p-3 rounded border border-green-500/10 hover:bg-slate-900/60 transition-colors">
                      {cryptoAddresses[selectedMethod]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Deposit Summary */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Deposit Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Method:</span>
                      <span className="text-white">
                        {selectedPaymentMethod?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Network:</span>
                      <span className="text-green-400">
                        {selectedPaymentMethod?.network}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Amount:</span>
                      <span className="text-white">${amount || "0.00"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Fee:</span>
                      <span className="text-green-400">$0.00</span>
                    </div>
                    <div className="border-t border-green-500/20 pt-3">
                      <div className="flex justify-between font-semibold">
                        <span className="text-white">Total:</span>
                        <span className="text-green-400">
                          ${amount || "0.00"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleProceed()}
                    disabled={!isValidAmount}
                    className="w-full mt-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 hover:scale-105 active:scale-95"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Important Notes */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-green-400" />
                    Important Notes
                  </h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Minimum deposit amount is $10</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Deposits are processed after network confirmation
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        All deposits are secured with advanced encryption
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <FileText className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>
                        Upload proof of payment to complete your deposit
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Proof of Payment Section */
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Upload className="w-5 h-5 mr-2 text-green-400" />
                    Upload Payment Proof
                  </h2>

                  {!proof ? (
                    <div className="border-2 border-dashed border-green-500/30 rounded-lg p-8 text-center hover:border-green-400/50 transition-colors">
                      <Upload className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-white mb-2">
                        Upload your payment screenshot
                      </p>
                      <p className="text-slate-400 text-sm mb-4">
                        Supported formats: JPEG, PNG, GIF (Max 5MB)
                      </p>
                      <label className="cursor-pointer">
                        <input
                          id="proof-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <span className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose File
                        </span>
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-lg border border-green-500/20">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-green-400" />
                          <div>
                            <p className="text-white font-medium">
                              {proof.name}
                            </p>
                            <p className="text-slate-400 text-sm">
                              {(proof.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {previewUrl && (
                            <button
                              onClick={() => setShowPreview(true)}
                              className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={removeProof}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {previewUrl && (
                        <div className="rounded-lg overflow-hidden border border-green-500/20">
                          <img
                            src={previewUrl}
                            alt="Payment proof preview"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Transaction Summary */}
                <div className="bg-slate-900/40 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/30 transition-all duration-300">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Transaction Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/60 rounded-lg border border-green-500/10">
                      <div className="flex items-center mb-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${selectedPaymentMethod?.color} shadow-lg mr-3`}
                        >
                          {selectedPaymentMethod?.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {selectedPaymentMethod?.name}
                          </h3>
                          <p className="text-slate-400 text-sm">
                            {selectedPaymentMethod?.network} Network
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Amount:</span>
                          <span className="text-white font-medium">
                            ${amount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Network Fee:</span>
                          <span className="text-green-400">Free</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">
                            Processing Time:
                          </span>
                          <span className="text-green-400">
                            {selectedPaymentMethod?.processingTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h3 className="font-semibold text-green-400 mb-2">
                        Payment Address
                      </h3>
                      <p className="text-slate-300 text-sm break-all font-mono">
                        {cryptoAddresses[selectedMethod]}
                      </p>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={!proof || isLoading}
                      className="w-full py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg hover:from-green-500 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Deposit</span>
                          <CheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {showPreview && previewUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-10 right-0 text-white hover:text-red-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={previewUrl}
              alt="Payment proof"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            180deg,
            rgba(34, 197, 94, 0.3),
            rgba(34, 197, 94, 0.6)
          );
          border-radius: 4px;
          border: 1px solid rgba(34, 197, 94, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            180deg,
            rgba(34, 197, 94, 0.5),
            rgba(34, 197, 94, 0.8)
          );
        }
      `}</style>
    </div>
  );
};

export default Deposit;
