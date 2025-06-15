
import React from 'react';
import { useResume, SocialLink } from '../../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const SocialLinksForm = () => {
  const { state, dispatch } = useResume();
  const { socialLinks } = state.resume;

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'LinkedIn',
      url: '',
      username: ''
    };
    dispatch({ type: 'ADD_SOCIAL_LINK', payload: newLink });
  };

  const updateSocialLink = (id: string, field: string, value: string) => {
    dispatch({
      type: 'UPDATE_SOCIAL_LINK',
      payload: { id, data: { [field]: value } }
    });
  };

  const deleteSocialLink = (id: string) => {
    dispatch({ type: 'DELETE_SOCIAL_LINK', payload: id });
  };

  const platformOptions = [
    'LinkedIn',
    'GitHub',
    'LeetCode',
    'Portfolio',
    'Twitter',
    'Instagram'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Social Links</h3>
        <button
          onClick={addSocialLink}
          className="flex items-center space-x-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          <Plus className="w-4 h-4" />
          <span>Add Link</span>
        </button>
      </div>

      {socialLinks.map((link) => (
        <div key={link.id} className="p-4 border border-gray-200 rounded-lg space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium text-gray-700">Social Link</h4>
            <button
              onClick={() => deleteSocialLink(link.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Platform
              </label>
              <select
                value={link.platform}
                onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {platformOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Username/Handle
              </label>
              <input
                type="text"
                value={link.username}
                onChange={(e) => updateSocialLink(link.id, 'username', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="your-username"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Full URL
              </label>
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}

      {socialLinks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No social links added yet.</p>
          <button
            onClick={addSocialLink}
            className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
          >
            Add your first social link
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialLinksForm;
