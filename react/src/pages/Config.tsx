import { useRef, useState } from 'react';
import type { DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Config.module.css';
import common from '../components/common.module.css';
import { useApp } from '../state/AppContext';
import { ROUTES } from '../routes';

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function Config() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const { profile } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File | null | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const dataUrl = await readFileAsDataUrl(file);
    dispatch({ type: 'SET_AVATAR_PHOTO', photo: dataUrl });
  };

  const onDrop = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <>
      <div className={styles.header}>
        <button className={styles.brandRow} onClick={() => navigate(ROUTES.home)}>
          <img src="/images/logo.png" alt="Rota do Enem" width={26} height={26} style={{ borderRadius: 8, display: 'block' }} />
          <div className={styles.wordmark}>Rota do Enem</div>
        </button>
        <h1 className={styles.title}>Ajustes</h1>
      </div>

      <div className={styles.body}>
        <div className={common.cardFlat}>
          <div className={common.field}>
            <div className={common.inputLabel}>Nome</div>
            <input
              className={common.inputField}
              placeholder="Seu nome"
              value={profile.name}
              onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })}
            />
          </div>
          <div className={common.field}>
            <div className={common.inputLabel}>E-mail</div>
            <input
              className={common.inputField}
              placeholder="seu@email.com"
              value={profile.email}
              onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value })}
            />
          </div>
          <div className={common.field}>
            <div className={common.inputLabel}>Número</div>
            <input
              className={common.inputField}
              placeholder="(11) 90000-0000"
              value={profile.phone}
              onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'phone', value: e.target.value })}
            />
          </div>
          <div className={common.field} style={{ marginBottom: 0 }}>
            <div className={common.inputLabel}>Data de nascimento</div>
            <input
              className={common.inputField}
              placeholder="dd/mm/aaaa"
              value={profile.birthdate}
              onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'birthdate', value: e.target.value })}
            />
          </div>
        </div>

        <div className={common.cardFlat}>
          <div className={common.kicker}>Foto de perfil</div>
          <div className={styles.avatarPicker}>
            {[1, 2, 3, 4].map((n) => {
              const isSelected = !profile.avatarPhoto && profile.avatar === n;
              return (
                <button
                  key={n}
                  className={`${styles.avatarOption} ${isSelected ? styles.selected : ''}`}
                  onClick={() => dispatch({ type: 'SET_AVATAR', avatar: n })}
                >
                  <div
                    className={`${styles.avatarImg} ${isSelected ? styles.selected : ''}`}
                    style={{ backgroundImage: `url("/images/avatar-${n}.png")` }}
                  />
                </button>
              );
            })}
          </div>
          <div className={styles.uploadRow}>
            <button
              className={`${styles.dropzone} ${dragOver ? styles.dragOver : ''}`}
              style={profile.avatarPhoto ? { backgroundImage: `url("${profile.avatarPhoto}")`, border: 'none' } : undefined}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              {!profile.avatarPhoto && 'Sua foto'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            <div className={styles.uploadHint}>Envie sua própria foto arrastando ou clicando aqui</div>
          </div>
        </div>

        <div className={common.cardFlat}>
          <div className={common.listRow}>
            <div>
              <div className={styles.settingLabel}>Notificações</div>
              <div className={styles.settingHint}>Lembrete diário às 19h</div>
            </div>
            <div
              className={`${common.track} ${profile.notif ? common.on : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_NOTIF' })}
            >
              <div className={common.knob} />
            </div>
          </div>
          <div className={common.listRow}>
            <div>
              <div className={styles.settingLabel}>Som</div>
              <div className={styles.settingHint}>Efeitos de acerto e combo</div>
            </div>
            <div
              className={`${common.track} ${profile.sound ? common.on : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
            >
              <div className={common.knob} />
            </div>
          </div>
        </div>

        <div className={common.cardFlat}>
          <button className={common.listRow} onClick={() => navigate(ROUTES.perfil)}>
            <div className={styles.settingLabel}>Editar perfil</div>
            <div className={styles.settingValue}>{profile.name || 'Marina Silva'}</div>
          </button>
          <button
            className={common.listRow}
            onClick={() => {
              dispatch({ type: 'LOGOUT' });
              navigate(ROUTES.entrada);
            }}
          >
            <div className={styles.logoutLabel}>Sair da conta</div>
          </button>
        </div>
      </div>
    </>
  );
}
