import { useState, useRef, useEffect } from 'react';
import { Store, Palette, Image, Type, Layout, Eye, Sparkles, CheckCircle, Link as LinkIcon, Tag, Upload, X, Share2, FileImage, FileText } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useAuth } from '../hooks/useAuth';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const templates = [
  {
    id: 1,
    name: 'Elegant Boutique',
    preview: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Perfect for fashion and clothing stores'
  },
  {
    id: 2,
    name: 'Artisan Crafts',
    preview: 'https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Showcase handmade products beautifully'
  },
  {
    id: 3,
    name: 'Fresh Market',
    preview: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Ideal for food and organic products'
  },
  {
    id: 4,
    name: 'Beauty & Wellness',
    preview: 'https://images.pexels.com/photos/3738387/pexels-photo-3738387.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Perfect for cosmetics and spa services'
  }
];

const colorThemes = [
  { name: 'Rose Pink', colors: ['#FFE4E1', '#FFC0CB', '#FF69B4'] },
  { name: 'Lavender', colors: ['#E6E6FA', '#DDA0DD', '#BA55D3'] },
  { name: 'Mint Green', colors: ['#F0FFF0', '#98FB98', '#3CB371'] },
  { name: 'Coral', colors: ['#FFF5EE', '#FF7F50', '#FF6347'] }
];

export function StorefrontBuilder() {
  const { profile } = useAuth();
  const [ref, isInView] = useInView();
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [storeName, setStoreName] = useState('');
  const [tagline, setTagline] = useState('');
  const [handle, setHandle] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [step, setStep] = useState(1);
  const [logo, setLogo] = useState<string | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // Personalization mapping
  useEffect(() => {
    if (profile?.business_about) {
      const focus = profile.business_about.toLowerCase();
      setStoreName(profile.full_name ? `${profile.full_name}'s Boutique` : '');

      // Auto-template selection
      if (focus.includes('fashion') || focus.includes('clothing')) setSelectedTemplate(1);
      else if (focus.includes('craft') || focus.includes('handmade') || focus.includes('handicraft')) setSelectedTemplate(2);
      else if (focus.includes('food') || focus.includes('organic') || focus.includes('agriculture')) setSelectedTemplate(3);
      else if (focus.includes('beauty') || focus.includes('wellness') || focus.includes('healthcare')) setSelectedTemplate(4);

      // Auto-theme selection
      if (focus.includes('fashion')) setSelectedTheme(0); // Rose Pink
      else if (focus.includes('craft')) setSelectedTheme(1); // Lavender
      else if (focus.includes('food') || focus.includes('agriculture')) setSelectedTheme(2); // Mint Green
      else if (focus.includes('beauty')) setSelectedTheme(3); // Coral
    }
  }, [profile]);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const productImagesInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProductImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + productImages.length > 4) {
      alert('Maximum 4 product images allowed');
      return;
    }

    files.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum 5MB per file.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setProductImages((prev) => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeProductImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  const exportAsPNG = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${storeName || 'storefront'}-storefront.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('Failed to export as PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPDF = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${storeName || 'storefront'}-storefront.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export as PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const shareAsPNG = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (blob && navigator.share) {
          const file = new File([blob], `${storeName || 'storefront'}-storefront.png`, { type: 'image/png' });
          navigator.share({
            title: `${storeName || 'Storefront'} - WomenPreneur`,
            text: `Check out my storefront created with WomenPreneur!`,
            files: [file],
          }).catch((error) => {
            console.error('Error sharing:', error);
            // Fallback to download if share fails
            exportAsPNG();
          });
        } else {
          // Fallback to download if share API not available
          exportAsPNG();
        }
      });
    } catch (error) {
      console.error('Error sharing PNG:', error);
      alert('Failed to share. Downloading instead...');
      exportAsPNG();
    } finally {
      setIsExporting(false);
    }
  };

  const shareAsPDF = async () => {
    // For PDF sharing, we'll export first then try to share
    await exportAsPDF();
    // Note: PDF sharing via Web Share API has limited support
    // This will download the PDF, and user can manually share it
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6 bg-gradient-to-br from-pink-50 via-purple-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-500/30">
            <Store className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Build Your Store</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Storefront Builder
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Create your beautiful online store in minutes with our easy-to-use builder
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-center items-center gap-4 mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${step >= num
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`w-24 h-1 ${step > num ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <span className={step >= 1 ? 'text-pink-500' : ''}>Choose Template</span>
            <span className={step >= 2 ? 'text-pink-500' : ''}>Customize</span>
            <span className={step >= 3 ? 'text-pink-500' : ''}>Preview & Export</span>
          </div>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Choose Your Template
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {templates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                  selected={selectedTemplate === template.id}
                  onSelect={() => setSelectedTemplate(template.id)}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => selectedTemplate && setStep(2)}
                disabled={!selectedTemplate}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${selectedTemplate
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Continue to Customization
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Customize Your Store
            </h2>
            <div className="glassmorphism p-8 rounded-3xl max-w-4xl mx-auto">
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Type className="w-5 h-5 text-pink-500" />
                    Store Name
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Enter your store name..."
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all text-gray-800 dark:text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                      <Tag className="w-5 h-5 text-pink-500" />
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Eg. Handmade, planet-friendly essentials"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all text-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                      <LinkIcon className="w-5 h-5 text-pink-500" />
                      Store Link (Optional)
                    </label>
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus-within:border-pink-400">
                      <span className="text-sm text-gray-500 dark:text-gray-400"></span>
                      <input
                        type="text"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                        placeholder="your-brand-link"
                        className="flex-1 bg-transparent outline-none text-gray-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Palette className="w-5 h-5 text-pink-500" />
                    Color Theme
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colorThemes.map((theme, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedTheme(index)}
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedTheme === index
                          ? 'border-pink-500 shadow-lg'
                          : 'border-gray-200 dark:border-gray-700'
                          }`}
                      >
                        <div className="flex gap-2 mb-2">
                          {theme.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-lg"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{theme.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Image className="w-5 h-5 text-pink-500" />
                    Upload Logo
                  </label>
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoUpload}
                    accept="image/png,image/jpeg,image/jpg"
                    className="hidden"
                  />
                  <div
                    onClick={() => logoInputRef.current?.click()}
                    className="border-2 border-dashed border-pink-300 dark:border-pink-500/30 rounded-xl p-8 text-center hover:border-pink-400 transition-colors cursor-pointer"
                  >
                    {logo ? (
                      <div className="relative">
                        <img src={logo} alt="Logo" className="max-h-32 mx-auto rounded-lg" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setLogo(null);
                            if (logoInputRef.current) logoInputRef.current.value = '';
                          }}
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="text-gray-600 dark:text-gray-300 mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Image className="w-5 h-5 text-pink-500" />
                    Product Images (Max 4)
                  </label>
                  <input
                    type="file"
                    ref={productImagesInputRef}
                    onChange={handleProductImagesUpload}
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    className="hidden"
                  />
                  <div
                    onClick={() => productImagesInputRef.current?.click()}
                    className="border-2 border-dashed border-pink-300 dark:border-pink-500/30 rounded-xl p-4 text-center hover:border-pink-400 transition-colors cursor-pointer mb-4"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">Click to add product images</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB each ({productImages.length}/4)</p>
                  </div>
                  {productImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {productImages.map((img, index) => (
                        <div key={index} className="relative aspect-square">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                          <button
                            onClick={() => removeProductImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
                    <Layout className="w-5 h-5 text-pink-500" />
                    Store Description
                  </label>
                  <textarea
                    rows={4}
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    placeholder="Tell customers about your store..."
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-pink-200 dark:border-pink-500/30 focus:border-pink-400 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-500/20 outline-none transition-all resize-none text-gray-800 dark:text-white"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Preview Store
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Preview Your Store
            </h2>
            <div className="glassmorphism p-8 rounded-3xl max-w-5xl mx-auto mb-8">
              <div
                ref={previewRef}
                className="rounded-xl p-8 mb-6 shadow-lg relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${colorThemes[selectedTheme].colors[0]} 0%, ${colorThemes[selectedTheme].colors[1]} 50%, ${colorThemes[selectedTheme].colors[2]} 100%)`,
                  minHeight: '600px'
                }}
              >
                {/* White content container for readability */}
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    {logo ? (
                      <img src={logo} alt="Logo" className="w-16 h-16 object-contain rounded-xl" />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {storeName || 'Your Store Name'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        womenpreneur.store/{handle || 'your-brand'}
                      </p>
                    </div>
                  </div>
                  {tagline && (
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 font-semibold">
                      {tagline}
                    </p>
                  )}
                  {storeDescription && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {storeDescription}
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {["Featured product photography", "Shipping & returns policy", "COD + UPI ready"].map((bullet) => (
                      <div key={bullet} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                  {productImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {productImages.map((img, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-md">
                          <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  {productImages.length === 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="glassmorphism p-4 rounded-2xl border border-pink-200/60 dark:border-pink-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">Launch checklist</p>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Add 6 product photos (1:1).</li>
                    <li>• Write 3 USPs in 1 line each.</li>
                    <li>• Set shipping & COD rules.</li>
                    <li>• Connect UPI / Razorpay checkout.</li>
                  </ul>
                </div>
                <div className="glassmorphism p-4 rounded-2xl border border-pink-200/60 dark:border-pink-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-pink-500" />
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">SEO & trust</p>
                  </div>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Keep URL handle short & readable.</li>
                    <li>• Add meta title: {storeName || 'Your Store'} | Women-led brand.</li>
                    <li>• Add WhatsApp contact & return policy link.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                  >
                    Edit Store
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={exportAsPNG}
                    disabled={isExporting}
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileImage className="w-5 h-5" />
                    {isExporting ? 'Exporting...' : 'Save as PNG'}
                  </button>
                  <button
                    onClick={exportAsPDF}
                    disabled={isExporting}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText className="w-5 h-5" />
                    {isExporting ? 'Exporting...' : 'Save as PDF'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={shareAsPNG}
                    disabled={isExporting}
                    className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-pink-500 text-pink-500 dark:text-pink-400 rounded-xl font-semibold hover:bg-pink-50 dark:hover:bg-pink-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Share2 className="w-5 h-5" />
                    Share as PNG
                  </button>
                  <button
                    onClick={shareAsPDF}
                    disabled={isExporting}
                    className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-purple-500 text-purple-500 dark:text-purple-400 rounded-xl font-semibold hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Share2 className="w-5 h-5" />
                    Share as PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TemplateCard({ template, index, selected, onSelect }: {
  template: typeof templates[0];
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={`cursor-pointer glassmorphism rounded-3xl overflow-hidden transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } ${selected ? 'ring-4 ring-pink-500 scale-105' : 'hover:scale-105'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-48 object-cover"
        />
        {selected && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">✓</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{template.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
      </div>
    </div>
  );
}
