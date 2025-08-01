import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';
import { ShoppingCart, Coins, Star, Crown, Shirt, Eye, Gift, Lock, Check, ArrowLeft } from 'lucide-react';

interface StoreItem {
  id: string;
  name: string;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  preview: string;
}

const StudentAvatarStore: React.FC = () => {
  const { showSuccess, showError, showWarning, showInfo } = useNotification();
  const [selectedCategory, setSelectedCategory] = useState('clothes');
  const [studentData, setStudentData] = useState({
    name: 'أحمد بن محمد',
    dinarsEarned: 180,
    ownedItems: ['basic_shirt', 'basic_hair', 'basic_eyes', 'basic_pants'],
    equippedItems: {
      hair: 'basic_hair',
      eyes: 'basic_eyes',
      clothes: 'basic_shirt',
      pants: 'basic_pants',
      accessories: null
    }
  });

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);

  const categories = [
    { id: 'clothes', name: 'الملابس', icon: Shirt, color: 'blue' },
    { id: 'pants', name: 'البناطيل', icon: Shirt, color: 'indigo' },
    { id: 'hair', name: 'الشعر', icon: Crown, color: 'purple' },
    { id: 'eyes', name: 'العيون', icon: Eye, color: 'green' },
    { id: 'accessories', name: 'الإكسسوارات', icon: Star, color: 'yellow' },
    { id: 'special', name: 'عناصر خاصة', icon: Gift, color: 'red' }
  ];

  const storeItems = {
    clothes: [
      { id: 'basic_shirt', name: 'قميص أساسي', price: 0, rarity: 'common' as const, preview: '👕' },
      { id: 'school_uniform', name: 'زي المدرسة', price: 50, rarity: 'common' as const, preview: '🎓' },
      { id: 'sports_shirt', name: 'قميص رياضي', price: 80, rarity: 'uncommon' as const, preview: '⚽' },
      { id: 'formal_shirt', name: 'قميص رسمي', price: 120, rarity: 'rare' as const, preview: '👔' },
      { id: 'algerian_shirt', name: 'قميص جزائري', price: 200, rarity: 'epic' as const, preview: '🇩🇿' }
    ],
    pants: [
      { id: 'basic_pants', name: 'بنطلون أساسي', price: 0, rarity: 'common' as const, preview: '👖' },
      { id: 'jeans', name: 'جينز', price: 60, rarity: 'common' as const, preview: '👖' },
      { id: 'sports_pants', name: 'بنطلون رياضي', price: 90, rarity: 'uncommon' as const, preview: '🩳' },
      { id: 'formal_pants', name: 'بنطلون رسمي', price: 130, rarity: 'rare' as const, preview: '👔' }
    ],
    hair: [
      { id: 'basic_hair', name: 'شعر أساسي', price: 0, rarity: 'common' as const, preview: '💇' },
      { id: 'curly_hair', name: 'شعر مجعد', price: 60, rarity: 'common' as const, preview: '🦱' },
      { id: 'long_hair', name: 'شعر طويل', price: 90, rarity: 'uncommon' as const, preview: '👩' },
      { id: 'cool_hair', name: 'شعر عصري', price: 150, rarity: 'rare' as const, preview: '🤵' }
    ],
    eyes: [
      { id: 'basic_eyes', name: 'عيون أساسية', price: 0, rarity: 'common' as const, preview: '👀' },
      { id: 'blue_eyes', name: 'عيون زرقاء', price: 70, rarity: 'uncommon' as const, preview: '💙' },
      { id: 'green_eyes', name: 'عيون خضراء', price: 70, rarity: 'uncommon' as const, preview: '💚' },
      { id: 'star_eyes', name: 'عيون نجمية', price: 180, rarity: 'epic' as const, preview: '⭐' }
    ],
    accessories: [
      { id: 'glasses', name: 'نظارات', price: 100, rarity: 'uncommon' as const, preview: '🤓' },
      { id: 'hat', name: 'قبعة', price: 120, rarity: 'rare' as const, preview: '🎩' },
      { id: 'crown', name: 'تاج', price: 300, rarity: 'legendary' as const, preview: '👑' },
      { id: 'medal', name: 'ميدالية', price: 250, rarity: 'epic' as const, preview: '🏅' }
    ],
    special: [
      { id: 'glow_effect', name: 'تأثير الإشعاع', price: 500, rarity: 'legendary' as const, preview: '✨' },
      { id: 'rainbow_aura', name: 'هالة قوس قزح', price: 400, rarity: 'epic' as const, preview: '🌈' },
      { id: 'star_trail', name: 'أثر النجوم', price: 350, rarity: 'epic' as const, preview: '💫' }
    ]
  };

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-200 bg-gray-50';
      case 'uncommon': return 'border-green-200 bg-green-50';
      case 'rare': return 'border-blue-200 bg-blue-50';
      case 'epic': return 'border-purple-200 bg-purple-50';
      case 'legendary': return 'border-yellow-200 bg-yellow-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getRarityBadgeColors = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'uncommon': return 'bg-green-100 text-green-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColors = (color: string, isSelected: boolean) => {
    if (isSelected) {
      switch (color) {
        case 'blue': return 'bg-blue-100 text-blue-800 ring-2 ring-blue-400';
        case 'indigo': return 'bg-indigo-100 text-indigo-800 ring-2 ring-indigo-400';
        case 'purple': return 'bg-purple-100 text-purple-800 ring-2 ring-purple-400';
        case 'green': return 'bg-green-100 text-green-800 ring-2 ring-green-400';
        case 'yellow': return 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400';
        case 'red': return 'bg-red-100 text-red-800 ring-2 ring-red-400';
        default: return 'bg-gray-100 text-gray-800 ring-2 ring-gray-400';
      }
    }
    return 'bg-gray-100 text-gray-600 hover:bg-gray-200';
  };

  const rarityNames = {
    common: 'عادي',
    uncommon: 'غير عادي',
    rare: 'نادر',
    epic: 'أسطوري',
    legendary: 'خرافي'
  };

  const handlePurchaseItem = (item: StoreItem) => {
    if (studentData.dinarsEarned >= item.price && !studentData.ownedItems.includes(item.id)) {
      setSelectedItem(item);
      setShowPurchaseModal(true);
    }
  };

  const confirmPurchase = () => {
    if (selectedItem && studentData.dinarsEarned >= selectedItem.price) {
      setStudentData(prev => ({
        ...prev,
        dinarsEarned: prev.dinarsEarned - selectedItem.price,
        ownedItems: [...prev.ownedItems, selectedItem.id]
      }));
      
      setShowPurchaseModal(false);
      showSuccess('تم بنجاح', `تم شراء ${selectedItem.name} بنجاح!`);
    }
  };

  const handleEquipItem = (item: StoreItem) => {
    if (studentData.ownedItems.includes(item.id)) {
      setStudentData(prev => ({
        ...prev,
        equippedItems: {
          ...prev.equippedItems,
          [selectedCategory]: item.id
        }
      }));
      showSuccess('تم بنجاح', `تم ارتداء ${item.name}!`);
    }
  };

  const isItemEquipped = (itemId: string) => {
    return Object.values(studentData.equippedItems).includes(itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()}
                className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold mb-2">🛍️ متجر الشخصية الرمزية</h1>
                <p className="text-purple-100">اجعل شخصيتك مميزة ومختلفة!</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-center mb-2">
                <Coins className="h-6 w-6 text-yellow-300 ml-2" />
                <span className="text-2xl font-bold">{studentData.dinarsEarned}</span>
              </div>
              <p className="text-sm">دينار معرفي</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Avatar Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">شخصيتك</h3>
              
              {/* Avatar Display */}
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 mb-6">
                <div className="text-center">
                  <div className="text-8xl mb-4">🧑‍🎓</div>
                  <p className="text-sm text-gray-600">{studentData.name}</p>
                </div>
              </div>

              {/* Equipped Items */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">العناصر المرتداة:</h4>
                {Object.entries(studentData.equippedItems).map(([category, itemId]) => {
                  if (!itemId) return null;
                  const categoryItems = storeItems[category as keyof typeof storeItems];
                  const item = categoryItems?.find(i => i.id === itemId);
                  if (!item) return null;
                  
                  return (
                    <div key={category} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-lg">{item.preview}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Store Content */}
          <div className="lg:col-span-3">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">الفئات</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-4 rounded-xl transition-all hover:scale-105 ${
                        getCategoryColors(category.color, selectedCategory === category.id)
                      }`}
                    >
                      <Icon className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-sm font-medium">{category.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Items Grid */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <div className="text-sm text-gray-500">
                  {storeItems[selectedCategory as keyof typeof storeItems]?.length} عنصر
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeItems[selectedCategory as keyof typeof storeItems]?.map((item) => (
                  <div
                    key={item.id}
                    className={`border-2 rounded-xl p-4 transition-all hover:shadow-lg ${
                      studentData.ownedItems.includes(item.id)
                        ? 'border-green-200 bg-green-50'
                        : getRarityColors(item.rarity)
                    }`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{item.preview}</div>
                      <h3 className="font-bold text-gray-800">{item.name}</h3>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getRarityBadgeColors(item.rarity)}`}>
                        {rarityNames[item.rarity]}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Coins className="h-4 w-4 text-yellow-600 ml-1" />
                        <span className="font-bold text-gray-800">
                          {item.price === 0 ? 'مجاني' : item.price}
                        </span>
                      </div>
                      {studentData.ownedItems.includes(item.id) && (
                        <div className="flex items-center text-green-600">
                          <Check className="h-4 w-4 ml-1" />
                          <span className="text-sm">مملوك</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {studentData.ownedItems.includes(item.id) ? (
                        <button
                          onClick={() => handleEquipItem(item)}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            isItemEquipped(item.id)
                              ? 'bg-green-600 text-white'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {isItemEquipped(item.id) ? '✅ مرتدى' : '👕 ارتداء'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchaseItem(item)}
                          disabled={studentData.dinarsEarned < item.price}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                            studentData.dinarsEarned >= item.price
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {studentData.dinarsEarned >= item.price ? (
                            <>
                              <ShoppingCart className="h-4 w-4 inline ml-1" />
                              شراء
                            </>
                          ) : (
                            <>
                              <Lock className="h-4 w-4 inline ml-1" />
                              غير متاح
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">تأكيد الشراء</h3>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{selectedItem.preview}</div>
              <h4 className="text-lg font-semibold text-gray-800">{selectedItem.name}</h4>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getRarityBadgeColors(selectedItem.rarity)}`}>
                {rarityNames[selectedItem.rarity]}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span>السعر:</span>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-yellow-600 ml-1" />
                  <span className="font-bold">{selectedItem.price}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span>رصيدك الحالي:</span>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-yellow-600 ml-1" />
                  <span className="font-bold">{studentData.dinarsEarned}</span>
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex items-center justify-between font-bold">
                <span>الرصيد بعد الشراء:</span>
                <div className="flex items-center">
                  <Coins className="h-4 w-4 text-yellow-600 ml-1" />
                  <span>{studentData.dinarsEarned - selectedItem.price}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={confirmPurchase}
                className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                تأكيد الشراء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAvatarStore;